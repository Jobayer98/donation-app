import { getProvider } from "../providers/payments";
import { PaymentSuccessDTO } from "../schema/payment.schema";

class PaymentService {
    async createPayment(donationId: string, amount: number, transactionId: string, currency: string, providerName: string) {
        const provider = getProvider(providerName)

        // create payment session
        const session = await provider.createPayment({ amount, transactionId, currency, customer: { id: donationId, name: '', email: '' } })

        return session
    }

    async handleSuccess(payload: PaymentSuccessDTO) {
        const provider = getProvider(payload.provider)

        await provider.validatePayment(payload.val_id, payload.transactionId)

    }

    async handleFail(payload: PaymentSuccessDTO) {
        const provider = getProvider(payload.provider)

        await provider.validatePayment(payload.val_id, payload.transactionId)
    }

    async handleCancel(payload: PaymentSuccessDTO) {
        const provider = getProvider(payload.provider)

        await provider.validatePayment(payload.val_id, payload.transactionId)
    }
}

export default new PaymentService();