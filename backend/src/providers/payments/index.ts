import { IPaymentProvider } from "./base.provider";
import SSLCommerzProvider from "./ssl.provider";
import StripePaymentProvider from "./stripe";

export function getProvider(type: string): IPaymentProvider {
    if (type === 'sslcommerz') {
        return new SSLCommerzProvider();
    }
    if (type === 'stripe') {
        return new StripePaymentProvider();
    }
    throw new Error('Invalid payment provider');
}