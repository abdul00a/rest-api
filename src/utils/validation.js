const Joi = require('joi');

const usersByIDvalidation = req => {
  const { id } = req;
  const schema = {
    id: Joi.number().required()
  };
  const result = Joi.validate(req, schema);
  return [id, result];
};

const insertNewAuthorValidation = req => {
  const schema = {
    id: Joi.number().required(),
    authorname: Joi.string()
      .min(3)
      .required(),
    authoremail: Joi.string()
      .email()
      .required(),
    numofpost: Joi.number().required()
  };
  return Joi.validate(req, schema);
};

const updateAuthorValidation = body => {
  const schema = {
    authorname: Joi.string()
      .min(3)
      .required(),
    authoremail: Joi.string()
      .email()
      .required(),
    numofpost: Joi.number().required()
  };
  return Joi.validate(body, schema);
};

const NewPostValidation = req => {
  const schema = {
    id: Joi.number().required(),
    refid: Joi.number().required(),
    posts: Joi.string()
      .min(5)
      .required()
  };
  return Joi.validate(req, schema);
};

const updatePostValidation = body => {
  const schema = {
    posts: Joi.string()
      .min(5)
      .required()
  };
  return Joi.validate(body, schema);
};

module.exports = {
  usersByIDvalidation,
  insertNewAuthorValidation,
  updateAuthorValidation,
  NewPostValidation,
  updatePostValidation
};
