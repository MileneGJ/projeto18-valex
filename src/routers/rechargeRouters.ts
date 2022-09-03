import { Router } from "express";
import apiVerify from '../middlewares/apiVerify'
import * as rechargeController from '../controllers/rechargeControllers'
import schemaValidation from "../middlewares/schemaValidation";
import transactionSchema from "../schemas/transactionSchema";

const rechargeRouters = Router()

rechargeRouters.post('/recharge/:cardId',apiVerify,schemaValidation(transactionSchema),rechargeController.newRecharge)

export default rechargeRouters