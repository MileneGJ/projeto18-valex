import { Request,Response, NextFunction } from "express";

export default function companyVerify (
    req:Request, res:Response, next:NextFunction) {

const apiKey = req.header('x-api-key')
if(typeof(apiKey)==='string'){
    res.locals.apiKey=apiKey
    next()
}

}