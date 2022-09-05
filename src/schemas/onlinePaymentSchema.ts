import joi from "joi";

const onlinePaymentSchema = joi.object({
    cardNumber: joi.string().required(),
    cardholderName: joi.string().required(),
    expirationDate: joi.string().required(),
    securityCode: joi.string().length(3).required(),
    amount: joi.number().min(1).required()
}) 

export default onlinePaymentSchema