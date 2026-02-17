import dotenv from "dotenv";
dotenv.config();

// app config
export const appConfig = {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    base_url: process.env.BASE_URL,
    database_url: process.env.DATABASE_URL,
}

// payment config
export const bkashConfig = {
    app_key: process.env.BKASH_APP_KEY,
    app_secret: process.env.BKASH_APP_SECRET,
    base_url: process.env.BKASH_BASE_URL,
    success_url: process.env.BKASH_SUCCESS_URL,
    cancel_url: process.env.BKASH_CANCEL_URL,
}

export const sslcommerzConfig = {
    store_id: process.env.SSLCOMMERZ_STORE_ID,
    store_password: process.env.SSLCOMMERZ_STORE_PASSWORD,
    base_url: process.env.BASE_URL,
    is_live: process.env.IS_LIVE,
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,
}

export const stripeConfig = {
    secretKey: process.env.STRIPE_SECRET_KEY,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
}
