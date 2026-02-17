export type PaymentInfo = {
    amount: Number,
    currency: string,
    customer?: {
        name: string,
        email: string,
    }
}