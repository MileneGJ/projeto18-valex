import { Request,Response } from "express";
import * as companyService from '../services/companyServices'
import * as employeeService from '../services/employeeServices'
import * as cardService from '../services/cardServices'

export async function createCard (req:Request,res:Response) {
    const {apiKey} = res.locals
    await companyService.companyVerify(apiKey)
    const employee = await employeeService.employeeVerifyForNewCard(req.body.employeeId,req.body.cardType)
    await cardService.createNewCard(employee.id,employee.fullName,req.body.cardType)
    res.sendStatus(200)    
}

export async function createPassword (req:Request, res:Response) {
    await cardService.activateCard(req.body.cardId,req.body.securityCode,req.body.password)
    res.sendStatus(200)
}