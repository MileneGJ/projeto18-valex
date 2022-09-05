import { Router } from "express";
import * as paymentController from '../controllers/paymentControllers'
import schemaValidation from "../middlewares/schemaValidation";
import onlinePaymentSchema from "../schemas/onlinePaymentSchema";
import posPaymentSchema from "../schemas/posPaymentSchema";

const paymentRouters = Router()

paymentRouters.post('/pos-purchase/:businessId',schemaValidation(posPaymentSchema),paymentController.newPurchase('POS'))
paymentRouters.post('/online-purchase/:businessId',schemaValidation(onlinePaymentSchema),paymentController.newPurchase('online'))

export default paymentRouters