import axios from "axios";
import { appConfig } from "../../config/config";
import { PaymentInfo } from "../../types/payment.type";
import { IPaymentProvider } from "./base.provider";
import donationService from "../../services/donation.service";
import paymentLogService from "../../services/paymentLog.service";
import paymentProviderService from "../../services/paymentProvider.service";
import { ApiError } from "../../utils/ApiError";
import { prisma } from "../../lib/prisma";

class SSLCommerzProvider implements IPaymentProvider {
  async createPayment(paymentInfo: PaymentInfo) {
    const campaign = await prisma.campaign.findUnique({
      where: { id: paymentInfo.campaignId },
      select: { organizationId: true },
    });

    const config = await paymentProviderService.getConfig(
      campaign!.organizationId,
      paymentInfo.providerName,
    );
    if (!config) throw new ApiError(400, "Payment provider not configured");

    const params = new URLSearchParams({
      store_id: config.storeId,
      store_passwd: config.storePassword,
      total_amount: paymentInfo.amount.toFixed(2),
      currency: config.currency,
      tran_id: paymentInfo.transactionId,
      success_url: `${appConfig.base_url}/api/payments/success`,
      fail_url: `${appConfig.base_url}/api/payments/fail`,
      cancel_url: `${appConfig.base_url}/api/payments/cancel`,
      ipn_url: `${appConfig.base_url}/api/payments/ipn`,
      cus_name: paymentInfo.customer?.name ?? "Customer Name",
      cus_email: paymentInfo.customer?.email ?? "customer@example.com",
    });

    const response = await axios.post(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      params,
    );
    return { url: response.data.GatewayPageURL };
  }

  async validatePayment(val_id: string, transactionId: string) {
    const donation = await prisma.donation.findUnique({
      where: { transactionId },
      include: { campaign: { select: { organizationId: true } } },
    });

    const config = await paymentProviderService.getConfig(
      donation!.campaign.organizationId,
      "sslcommerz",
    );
    if (!config) throw new ApiError(400, "Payment provider not configured");

    const response = await axios.get(
      `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php`,
      {
        params: {
          val_id,
          store_id: config.storeId,
          store_passwd: config.storePassword,
        },
      },
    );

    const status = response.data.status === "VALID" ? "SUCCESS" : "FAILED";
    await donationService.updateStatus(transactionId, status);

    if (status === "SUCCESS") {
      const campaign = await donationService.incrementCampaignAmount(
        donation!.campaignId,
        Number(donation!.amount),
      );
      await paymentLogService.create(response.data, campaign.organizationId);
    }
  }
}

export default SSLCommerzProvider;
