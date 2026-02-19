import { prisma } from "../lib/prisma";
import { encrypt, decrypt } from "../utils/crypto";

class PaymentProviderService {
  async create(name: string, config: any, fundRaiserId: string) {
    const encryptedConfig = encrypt(JSON.stringify(config));
    
    return prisma.paymentProvider.create({
      data: { name, config: encryptedConfig, fundRaiserId },
      select: { id: true, name: true, isActive: true },
    });
  }

  async findByFundraiser(fundRaiserId: string) {
    return prisma.paymentProvider.findMany({
      where: { fundRaiserId },
      select: { id: true, name: true, currency: true, isActive: true, createdAt: true },
    });
  }

  async toggleStatus(id: string, fundRaiserId: string) {
    const provider = await prisma.paymentProvider.findUnique({
      where: { id, fundRaiserId },
    });
    return prisma.paymentProvider.update({
      where: { id, fundRaiserId },
      data: { isActive: !provider?.isActive },
      select: { id: true, isActive: true },
    });
  }

  async getActiveByCampaign(campaignId: string) {
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      select: { fundraiserId: true },
    });
    return prisma.paymentProvider.findMany({
      where: { fundRaiserId: campaign!.fundraiserId, isActive: true },
      select: { name: true },
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
}

export default new PaymentProviderService();
