import Stripe from "stripe";
import { appConfig } from "../../config/config";
import { PaymentInfo } from "../../types/payment.type";
import { IPaymentProvider } from "./base.provider";
import donationService from "../../services/donation.service";
import paymentLogService from "../../services/paymentLog.service";
import paymentProviderService from "../../services/paymentProvider.service";
import { ApiError } from "../../utils/ApiError";
import { prisma } from "../../lib/prisma";

class StripePaymentProvider implements IPaymentProvider {
    async createPayment(paymentInfo: PaymentInfo): Promise<{ url: string }> {
        const campaign = await prisma.campaign.findUnique({
            where: { id: paymentInfo.campaignId },
            select: { fundraiserId: true },
        });

        const config = await paymentProviderService.getConfig(
            campaign!.fundraiserId,
            paymentInfo.providerName,
        );
        if (!config) throw new ApiError(400, "Payment provider not configured");

        const stripe = new Stripe(config.storeId);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: config.currency.toLowerCase(),
                        product_data: {
                            name: "Donation",
                        },
                        unit_amount: Math.round(paymentInfo.amount * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            metadata: {
                transactionId: paymentInfo.transactionId,
                campaignId: paymentInfo.campaignId,
            },
            success_url: `${appConfig.base_url}/api/payments/success?val_id={CHECKOUT_SESSION_ID}&tran_id=${paymentInfo.transactionId}`,
            cancel_url: `${appConfig.base_url}/api/payments/cancel?val_id={CHECKOUT_SESSION_ID}&tran_id=${paymentInfo.transactionId}`,
        });

        if (!session.url) {
            throw new ApiError(500, "Failed to create Stripe checkout session");
        }

        return { url: session.url };
    }

    async validatePayment(val_id: string, transactionId: string): Promise<void> {
        const donation = await prisma.donation.findUnique({
            where: { transactionId },
            include: { campaign: { select: { fundraiserId: true } } },
        });

        if (!donation) throw new ApiError(404, "Donation not found");

        const config = await paymentProviderService.getConfig(
            donation.campaign.fundraiserId,
            "stripe",
        );
        if (!config) throw new ApiError(400, "Payment provider not configured");

        const stripe = new Stripe(config.storeId);

        const session = await stripe.checkout.sessions.retrieve(val_id);

        const status = session.payment_status === "paid" ? "SUCCESS" : "FAILED";
        await donationService.updateStatus(transactionId, status);

        if (status === "SUCCESS") {
            const campaign = await donationService.incrementCampaignAmount(
                donation.campaignId,
                Number(donation.amount),
            );

            await paymentLogService.create(
                {
                    tran_id: transactionId,
                    val_id: val_id,
                    amount: Number(donation.amount),
                    store_amount: Number(donation.amount),
                    currency: config.currency,
                    bank_tran_id: session.payment_intent as string,
                    card_type: session.payment_method_types?.[0] || "card",
                    card_no: "",
                    card_issuer: "",
                    card_brand: "",
                    card_issuer_country: "",
                    card_issuer_country_code: "",
                    currency_type: config.currency,
                    currency_amount: Number(donation.amount),
                    currency_rate: 1,
                },
                campaign.fundraiserId,
            );
        }
    }
}

export default StripePaymentProvider;