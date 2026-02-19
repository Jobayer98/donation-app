import { getProvider } from "../providers/payments";
import { PaymentSuccessDTO } from "../schema/payment.schema";

class PaymentService {
    async createPayment(donationId: string, amount: number, transactionId: string, providerName: string, campaignId: string) {
        const provider = getProvider(providerName);
        return provider.createPayment({
            amount,
            transactionId,
            campaignId,
            providerName,
            customer: { id: donationId, name: '', email: '' }
        });
    }

    async handlePaymentCallback(payload: PaymentSuccessDTO) {
        const provider = getProvider(payload.provider);
        await provider.validatePayment(payload.val_id, payload.transactionId);
    }
}

export default new PaymentService();