// import Joi method from joi package
const Joi = require('joi');

// validation function for users by id
const usersByIDvalidation = req => {
  const { id } = req;
  const schema = {
    id: Joi.number().required()
  };
  const result = Joi.validate(req, schema);
  return [id, result];
};

// validation function to insert new data in author table
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

// validation function to update author in author table
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

// validation function to insert new data in posts table
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

// validation function to update posts in posts table
const updatePostValidation = body => {
  const schema = {
    posts: Joi.string()
      .min(5)
      .required()
  };
  return Joi.validate(body, schema);
};

// export validation function
module.exports = {
  usersByIDvalidation,
  insertNewAuthorValidation,
  updateAuthorValidation,
  NewPostValidation,
  updatePostValidation
};
