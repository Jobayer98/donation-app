import { prisma } from "../lib/prisma";

class PaymentLogService {
  async create(data: any, fundRaiserId: string) {
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
        fundRaiserId,
      },
    });
  }
}

export default new PaymentLogService();
