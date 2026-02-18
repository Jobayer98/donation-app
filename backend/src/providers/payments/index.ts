import { IPaymentProvider } from "./base.provider";
import SSLCommerzProvider from "./ssl.provider";

export function getProvider(type: string): IPaymentProvider {
    if (type === 'sslcommerz') {
        return new SSLCommerzProvider();
    }
    throw new Error('Invalid payment provider');
}