import axios from "axios";
import { sslcommerzConfig, appConfig } from "../../lib/config";
import { PaymentInfo } from "../../types/payment.type";
import { IPaymentProvider } from "./base.provider";
import donationService from "../../services/donation.service";
import paymentLogService from "../../services/paymentLog.service";

class SSLCommerzProvider implements IPaymentProvider {
    async createPayment(paymentInfo: PaymentInfo) {
        const params = new URLSearchParams({
            store_id: sslcommerzConfig.store_id!,
            store_passwd: sslcommerzConfig.store_password!,
            total_amount: paymentInfo.amount.toString(),
            currency: paymentInfo.currency,
            tran_id: paymentInfo.transactionId!,
            success_url: `${appConfig.base_url}/api/payments/success`,
            fail_url: `${appConfig.base_url}/api/payments/fail`,
            cancel_url: `${appConfig.base_url}/api/payments/cancel`,
            ipn_url: `${appConfig.base_url}/api/payments/ipn`,
            cus_name: paymentInfo.customer?.name ?? "Customer Name",
            cus_email: paymentInfo.customer?.email ?? "customer@example.com"
        });

        const response = await axios.post('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', params);
        return { url: response.data.GatewayPageURL };
    }

    async validatePayment(val_id: string, transactionId: string) {
        const response = await axios.get(
            `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php`,
            { params: { val_id, store_id: sslcommerzConfig.store_id, store_passwd: sslcommerzConfig.store_password } }
        );

        const status = response.data.status === 'VALID' ? 'SUCCESS' : 'FAILED';
        const donation = await donationService.updateStatus(transactionId, status);

        if (status === 'SUCCESS') {
            const campaign = await donationService.incrementCampaignAmount(donation.campaignId, Number(donation.amount));
            await paymentLogService.create(response.data, campaign.fundraiserId);
        }
    }
}

export default SSLCommerzProvider;