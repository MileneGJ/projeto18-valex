import { Router } from "express";
import * as cardController from '../controllers/cardControllers'
import apiVerify from "../middlewares/apiVerify";
import schemaValidation from "../middlewares/schemaValidation";
import cardSchema from "../schemas/cardSchema";

const cardRouters = Router()

cardRouters.post('/card',apiVerify,schemaValidation(cardSchema),cardController.createCard)

export default cardRouters