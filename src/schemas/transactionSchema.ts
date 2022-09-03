import joi from "joi";

const transactionSchema = joi.object({
    amount:joi.number().min(1).required()
})

export default transactionSchema