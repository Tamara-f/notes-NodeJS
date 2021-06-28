const { HttpCode } = require('../helpers/constants');
const Joi = require('joi');

const validateAddNote = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().valid('Task', 'Idea', 'Random Though').required(),
    content: Joi.string().required(),
  });
  const validationRes = schema.validate(req.body);
  if (validationRes.error) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .send('"message": "missing required name field"', validationRes.error);
  }
  next();
};

const validateUpdateNote = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string(),
    category: Joi.string().valid('Task', 'Idea', 'Random Though'),
    content: Joi.string(),
    archived: Joi.boolean(),
  });
  const validationRes = schema.validate(req.body);
  if (validationRes.error) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .send(body, 'missing fields', validationRes.error);
  }
  next();
};

module.exports = {
  validateAddNote,
  validateUpdateNote,
};
