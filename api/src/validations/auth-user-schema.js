import Joi from 'joi'

export default Joi.object({
  pseudo: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string().required(),
})
