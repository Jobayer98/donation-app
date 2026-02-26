import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import organizationService from "./organization.service";

class PaymentLogService {
  async create(data: any, userId: string) {
    const org = await organizationService.getUserOrganization(userId);
    
    if (!org) {
      throw new ApiError(404, "Organization not found. Please create an organization first.");
    }

    return prisma.paymentLog.create({
      data: {
        transactionId: data.tran_id,
        valId: data.val_id,
        amount: parseFloat(data.amount),
        storeAmount: parseFloat(data.store_amount),
        currency: data.currency,
        bankTranId: data.bank_tran_id,
        cardType: data.card_type,
        cardNo: data.card_no,
        cardIssuer: data.card_issuer,
        cardBrand: data.card_brand,
        cardIssuerCountry: data.card_issuer_country,
        cardIssuerCountryCode: data.card_issuer_country_code,
        currencyType: data.currency_type,
        currencyAmount: parseFloat(data.currency_amount),
        currencyRate: parseFloat(data.currency_rate),
        organizationId: org.id,
      },
    });
  }
}

export default new PaymentLogService();
