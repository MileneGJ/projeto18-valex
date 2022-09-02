import { Router } from "express";
import * as cardController from '../controllers/cardControllers'
import apiVerify from "../middlewares/apiVerify";
import schemaValidation from "../middlewares/schemaValidation";
import activateCardSchema from "../schemas/activateCardSchema";
import blockCardSchema from "../schemas/blockCardSchema";
import newCardSchema from "../schemas/newCardSchema";

const cardRouters = Router()

cardRouters.post('/newCard',apiVerify,schemaValidation(newCardSchema),cardController.createCard)
cardRouters.post('/card/activate/:cardId',schemaValidation(activateCardSchema),cardController.createPassword)
cardRouters.get('/balance/:cardId',cardController.getBalance)
cardRouters.post('/card/block/:cardId',schemaValidation(blockCardSchema),cardController.blockCard)
cardRouters.post('/card/unblock/:cardId',schemaValidation(blockCardSchema),cardController.unblockCard)

export default cardRouters