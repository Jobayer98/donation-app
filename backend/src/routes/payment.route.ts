import { Router } from "express";
import { createPaymentSession, handlePaymentCancel, handlePaymentFail, handlePaymentSuccess } from "../controllers/payment.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { PaymentSchema, PaymentSuccessSchema } from "../schema/payment.schema";


const router = Router();

router.post('/create-payment', validateBody(PaymentSchema), createPaymentSession);
router.post('/payment/success', handlePaymentSuccess);
router.post('/payment/fail', handlePaymentFail);
router.post('/payment/cancel', handlePaymentCancel);

export default router;  