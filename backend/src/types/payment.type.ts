export type PaymentInfo = {
    amount: number,
    currency: string,
    transactionId?: string,
    customer?: {
        id: string,
        name: string,
        email: string,
    }
}