import { Request, Response } from "express";
import * as cardService from '../services/cardServices'
import * as businessService from '../services/businessServices'
import * as paymentService from '../services/paymentServices'

export function newPurchase(method: string) {
    const type = method + ' purchase'
    return async (req: Request, res: Response) => {
        const { businessId } = req.params
        const card = await cardService.conditionsForTransactions(req.body, type)
        await businessService.checkBusinessIdAndType(card.id, Number(businessId))
        await paymentService.addPurchase(card.id, req.body.amount, Number(businessId))
        res.sendStatus(200)
    }
} 