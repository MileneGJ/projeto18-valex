import { Router } from "express";
import * as cardController from '../controllers/cardControllers'
import apiVerify from "../middlewares/apiVerify";
import schemaValidation from "../middlewares/schemaValidation";
import activateCardSchema from "../schemas/activateCardSchema";
import newCardSchema from "../schemas/newCardSchema";

const cardRouters = Router()

cardRouters.post('/card',apiVerify,schemaValidation(newCardSchema),cardController.createCard)
cardRouters.post('/card/activate',schemaValidation(activateCardSchema),cardController.createPassword)

export default cardRouters