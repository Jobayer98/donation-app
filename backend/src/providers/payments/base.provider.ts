import { PaymentInfo } from "../../types/payment.type";

export interface IPaymentProvider {
    createPayment(paymentInfo: PaymentInfo): Promise<{ url: string }>;
    validatePayment(val_id: string, transactionId: string): Promise<void>;
}
