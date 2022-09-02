import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default function (schema:Joi.ObjectSchema<any>){
    return (req:Request,res:Response,next:NextFunction)=>{

        const {error} = schema.validate(req.body,{abortEarly:false})
        if(error){
            let message = ""
            error.details.map(x=>message += x.message + '\n')
            throw {code:'InvalidInput',message:message}
        } else {
            next()
        }

    }
} 