import { Router } from "express";
import apiVerify from '../middlewares/apiVerify'
import * as rechargeController from '../controllers/rechargeControllers'
import schemaValidation from "../middlewares/schemaValidation";
import rechargeSchema from "../schemas/rechargeSchema";

const rechargeRouters = Router()

rechargeRouters.post('/recharge/:cardId',apiVerify,schemaValidation(rechargeSchema),rechargeController.newRecharge)

export default rechargeRouters