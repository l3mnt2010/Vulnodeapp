const Joi = require("joi");

const userValidate = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(3).max(50).required(),
  });
  return userSchema.validate(data);
};

module.exports = userValidate;
