import SSLCommerzProvider from "./ssl.provider";

export function getProvider(type: string) {
    if (type === 'sslcommerz') {
        return new SSLCommerzProvider();
    }

    throw new Error('Invalid payment provider');
}