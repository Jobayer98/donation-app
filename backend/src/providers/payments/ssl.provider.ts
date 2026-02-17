import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { sslcommerzConfig, appConfig } from "../../lib/config";
import { PaymentInfo } from "../../types/payment.type";



class SSLCommerzProvider {
    async createPayment(paymentInfo: PaymentInfo) {
        const data = {
            store_id: sslcommerzConfig.store_id,
            store_passwd: sslcommerzConfig.store_password,
            total_amount: paymentInfo.amount,
            currency: paymentInfo.currency,
            tran_id: uuidv4(),
            success_url: `${appConfig.base_url}/payment/success`,
            fail_url: `${appConfig.base_url}/payment/fail`,
            cancel_url: `${appConfig.base_url}/payment/cancel`,
            ipn_url: `${appConfig.base_url}/payment/ipn`,
            cus_name: paymentInfo.customer?.name ?? "Customer Name",
            cus_email: paymentInfo.customer?.email ?? "customer@example.com",
        };



        const params = new URLSearchParams(data as any);

        const response = await axios.post('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', params);

        return { url: response.data.GatewayPageURL }
    }

    async validatePayment(val_id: string) {
        const response = await axios.get(`https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${sslcommerzConfig.store_id}&store_passwd=${sslcommerzConfig.store_password}`);

        const data = response.data

        if (data.status !== 'VALID') {
            return false
        }

        return true
    }
}

export default SSLCommerzProvider;