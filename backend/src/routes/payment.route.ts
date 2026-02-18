import { Router } from "express";
import {
  createPaymentSession,
  handlePaymentCancel,
  handlePaymentFail,
  handlePaymentSuccess,
} from "../controllers/payment.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { PaymentSchema, PaymentCallbackSchema } from "../schema/payment.schema";

const router = Router();

router.post(
  "/create-payment",
  validateBody(PaymentSchema),
  createPaymentSession,
);
router.post("/success", validateBody(PaymentCallbackSchema), handlePaymentSuccess);
router.post("/fail", validateBody(PaymentCallbackSchema), handlePaymentFail);
router.post("/cancel", validateBody(PaymentCallbackSchema), handlePaymentCancel);

export default router;
