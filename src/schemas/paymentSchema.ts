import joi from "joi";

const paymentSchema = joi.object({
    password: joi.string().length(4).required(),
    amount: joi.number().min(1).required(),
    businessId: joi.number().required()
}) 

export default paymentSchema