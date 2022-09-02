import { Request,Response } from "express";
import * as companyService from '../services/companyServices'
import * as employeeService from '../services/employeeServices'
import * as cardService from '../services/cardServices'
import * as paymentService from '../services/paymentServices'

export async function createCard (req:Request,res:Response) {
    const {apiKey} = res.locals
    await companyService.companyVerify(apiKey)
    const employee = await employeeService.employeeVerifyForNewCard(req.body.employeeId,req.body.cardType)
    await cardService.createNewCard(employee.id,employee.fullName,req.body.cardType)
    res.sendStatus(201)    
}

export async function createPassword (req:Request, res:Response) {
    const {cardId} = req.params
    await cardService.activateCard(Number(cardId),req.body.securityCode,req.body.password)
    res.sendStatus(200)
}

export async function getBalance (req:Request, res:Response) {
    const {cardId} = req.params
    await cardService.cardExistsVerify(Number(cardId))
    const balance = await paymentService.getBalance(Number(cardId))
    res.status(200).send(balance)
}

export async function blockCard (req: Request, res: Response) {
    const {cardId} = req.params
    await cardService.blockCard(Number(cardId),req.body.password)
    res.sendStatus(200)
}

export async function unblockCard (req: Request, res: Response) {
    const {cardId} = req.params
    await cardService.unblockCard(Number(cardId),req.body.password)
    res.sendStatus(200)
}