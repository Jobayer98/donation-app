export type PaymentInfo = {
    amount: number,
    transactionId: string,
    campaignId: string,
    providerName: string,
    customer?: {
        id: string,
        name: string,
        email: string,
    }
}