import joi from "joi";

const blockCardSchema = joi.object({
    password:joi.string().length(4).required()
})

export default blockCardSchema