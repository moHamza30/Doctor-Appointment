const Joi = require("joi");

const AppError = require("./AppError");
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const registerSchema = Joi.object({
  username:Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(new AppError("validation error", 400));
  next();
};

const registerValidation = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return next(new AppError("validation error", 400));
  next();
};

module.exports = { loginValidation, registerValidation };
