import { z } from "zod"

export const PaymentSchema = z.object({
    provider: z.enum(['sslcommerz', 'stripe', 'bkash']),
    amount: z.number(),
    currency: z.string(),
    customer: z.object({
        name: z.string(),
        email: z.string(),
    }).optional()
})

export const PaymentSuccessSchema = z.object({
    provider: z.enum(['sslcommerz', 'stripe', 'bkash']),
    val_id: z.string()
})

export type PaymentDTO = z.infer<typeof PaymentSchema>
export type PaymentSuccessDTO = z.infer<typeof PaymentSuccessSchema>