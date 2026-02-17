import { getProvider } from "../providers/payments";
import SSLCommerzProvider from "../providers/payments/ssl.provider";
import { PaymentDTO, PaymentSuccessDTO } from "../schema/payment.schema";

class PaymentService {
    async createPayment(payload: PaymentDTO) {
        const provider = getProvider(payload.provider)

        // create payment session
        const session = await provider.createPayment({ amount: payload.amount, currency: payload.currency, customer: payload.customer })

        return session
    }

    async handleSuccess(payload: PaymentSuccessDTO) {
        // const provider = getProvider(payload.provider)
        const provider = new SSLCommerzProvider();

        await provider.validatePayment(payload.val_id)

        return { status: 'success', message: 'Payment successful' }
    }

    async handleFail(payload: PaymentSuccessDTO) {
        // const provider = getProvider(payload.provider)
        const provider = new SSLCommerzProvider();

        const result = await provider.validatePayment(payload.val_id)

        return result
    }

    async handleCancel(payload: PaymentSuccessDTO) {
        // const provider = getProvider(payload.provider)
        const provider = new SSLCommerzProvider();

        const result = await provider.validatePayment(payload.val_id)

        return result
    }
}

export default new PaymentService();