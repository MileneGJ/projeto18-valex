import { Request, Response } from "express";
import * as rechargeService from '../services/rechargeServices'
import * as companyService from '../services/companyServices'
import * as cardService from '../services/cardServices'

export async function newRecharge(req: Request, res: Response) {
    const { apiKey } = res.locals
    const { cardId } = req.params
    await companyService.companyVerify(apiKey)
    await cardService.conditionsForTransactions(Number(cardId),'recharge','')
    await rechargeService.addRecharge(Number(cardId), req.body.amount)
    res.sendStatus(200)
}