import { Request, Response } from "express";
import * as cardService from '../services/cardServices'
import * as businessService from '../services/businessServices' 
import * as paymentService from '../services/paymentServices'

export async function newPurchase (req:Request, res: Response) {
    const {cardId} = req.params
    await cardService.conditionsForTransactions(Number(cardId),'purchase',req.body.password)
    await businessService.checkBusinessIdAndType(Number(cardId),req.body.businessId)
    await paymentService.addPurchase(Number(cardId),req.body.amount,req.body.businessId)
    res.sendStatus(200)
}
