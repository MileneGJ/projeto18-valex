import joi from "joi";

const posPaymentSchema = joi.object({
    password: joi.string().length(4).required(),
    amount: joi.number().min(1).required(),
    cardId: joi.number().required()
}) 

export default posPaymentSchema