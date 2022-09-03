import { Router } from "express";
import * as paymentController from '../controllers/paymentControllers'
import schemaValidation from "../middlewares/schemaValidation";
import paymentSchema from "../schemas/paymentSchema";

const paymentRouters = Router()

paymentRouters.post('/purchase/:cardId',schemaValidation(paymentSchema),paymentController.newPurchase)

export default paymentRouters