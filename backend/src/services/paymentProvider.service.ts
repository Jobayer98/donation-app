import { prisma } from "../lib/prisma";
import { encrypt, decrypt } from "../utils/crypto";
import { ApiError } from "../utils/ApiError";
import axios from "axios";

class PaymentProviderService {
  async create(name: string, config: any, fundRaiserId: string, currency: string = "BDT") {
    // Validate credentials before saving
    await this.validateCredentials(name, config);

    const encryptedConfig: any = encrypt(JSON.stringify(config));

    // Check if this is the first provider for the fundraiser
    const existingCount = await prisma.paymentProvider.count({
      where: { fundRaiserId }
    });

    return prisma.paymentProvider.create({
      data: {
        name,
        config: encryptedConfig,
        fundRaiserId,
        currency,
        isDefault: existingCount === 0 // First provider is default
      },
      select: { id: true, name: true, currency: true, isActive: true, isDefault: true },
    });
  }

  async update(id: string, fundRaiserId: string, data: { name?: string; config?: any; currency?: string }) {
    const provider = await prisma.paymentProvider.findUnique({
      where: { id, fundRaiserId }
    });

    if (!provider) {
      throw new ApiError(404, "Payment provider not found");
    }

    // Validate new credentials if config is being updated
    if (data.config) {
      await this.validateCredentials(data.name || provider.name, data.config);
    }

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.currency) updateData.currency = data.currency;
    if (data.config) updateData.config = encrypt(JSON.stringify(data.config));

    return prisma.paymentProvider.update({
      where: { id, fundRaiserId },
      data: updateData,
      select: { id: true, name: true, currency: true, isActive: true, isDefault: true },
    });
  }

  async delete(id: string, fundRaiserId: string) {
    const provider = await prisma.paymentProvider.findUnique({
      where: { id, fundRaiserId }
    });

    if (!provider) {
      throw new ApiError(404, "Payment provider not found");
    }

    if (provider.isDefault) {
      throw new ApiError(400, "Cannot delete default provider. Set another provider as default first.");
    }

    await prisma.paymentProvider.delete({
      where: { id, fundRaiserId }
    });
  }

  async findByFundraiser(fundRaiserId: string) {
    return prisma.paymentProvider.findMany({
      where: { fundRaiserId },
      select: { id: true, name: true, currency: true, isActive: true, isDefault: true, createdAt: true, config: true },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }]
    });
  }

  async toggleStatus(id: string, fundRaiserId: string) {
    const provider = await prisma.paymentProvider.findUnique({
      where: { id, fundRaiserId },
    });

    if (!provider) {
      throw new ApiError(404, "Payment provider not found");
    }

    if (provider.isDefault && provider.isActive) {
      throw new ApiError(400, "Cannot deactivate default provider");
    }

    return prisma.paymentProvider.update({
      where: { id, fundRaiserId },
      data: { isActive: !provider.isActive },
      select: { id: true, isActive: true },
    });
  }

  async setDefault(id: string, fundRaiserId: string) {
    const provider = await prisma.paymentProvider.findUnique({
      where: { id, fundRaiserId }
    });

    if (!provider) {
      throw new ApiError(404, "Payment provider not found");
    }

    if (!provider.isActive) {
      throw new ApiError(400, "Cannot set inactive provider as default");
    }

    // Use transaction to ensure atomicity
    await prisma.$transaction([
      // Remove default from all providers
      prisma.paymentProvider.updateMany({
        where: { fundRaiserId },
        data: { isDefault: false }
      }),
      // Set new default
      prisma.paymentProvider.update({
        where: { id, fundRaiserId },
        data: { isDefault: true }
      })
    ]);

    return prisma.paymentProvider.findUnique({
      where: { id, fundRaiserId },
      select: { id: true, name: true, isDefault: true }
    });
  }

  async getActiveByCampaign(campaignId: string) {
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      select: { fundraiserId: true },
    });

    if (!campaign) {
      throw new ApiError(404, "Campaign not found");
    }

    return prisma.paymentProvider.findMany({
      where: { fundRaiserId: campaign.fundraiserId, isActive: true },
      select: { id: true, name: true, currency: true, isDefault: true },
      orderBy: { isDefault: 'desc' }
    });
  }

  async getConfig(fundRaiserId: string, providerName: string) {
    const provider = await prisma.paymentProvider.findFirst({
      where: { fundRaiserId, name: providerName, isActive: true },
      select: { config: true, currency: true },
    });

    if (!provider) {
      throw new Error('Payment provider not found');
    }

    const decryptedConfig = decrypt(provider.config as string);
    const jsonConfig = JSON.parse(decryptedConfig);

    return {
      storeId: jsonConfig.api_key,
      storePassword: jsonConfig.secret_key,
      currency: provider.currency,
    };
  }

  private async validateCredentials(providerName: string, config: any): Promise<void> {
    // Basic validation
    if (!config.api_key || !config.secret_key) {
      throw new ApiError(400, "API key and secret key are required");
    }

    // Provider-specific validation
    if (providerName.toLowerCase() === 'stripe') {
      await this.validateStripe(config);
    } else if (providerName.toLowerCase() === 'sslcommerz') {
      await this.validateSSLCommerz(config);
    }
  }

  private async validateStripe(config: any): Promise<void> {
    try {
      // Simple validation - check if key format is correct
      if (!config.api_key.startsWith('sk_')) {
        throw new ApiError(400, "Invalid Stripe secret key format");
      }
    } catch (error: any) {
      throw new ApiError(400, `Stripe validation failed: ${error.message}`);
    }
  }

  private async validateSSLCommerz(config: any): Promise<void> {
    try {
      // Validate by making a test API call
      const testUrl = config.is_live
        ? 'https://securepay.sslcommerz.com/validator/api/validationserverAPI.php'
        : 'https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php';

      // Just check if credentials format is valid
      if (config.api_key.length < 10 || config.secret_key.length < 10) {
        throw new ApiError(400, "Invalid SSLCommerz credentials format");
      }
    } catch (error: any) {
      throw new ApiError(400, `SSLCommerz validation failed: ${error.message}`);
    }
  }
}

export default new PaymentProviderService();
