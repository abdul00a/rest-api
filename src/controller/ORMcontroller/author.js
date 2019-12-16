const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { models } = require('../../modules/ormModel'); // import sequlize model

dotenv.config();

// import validation schema
const {
  insertNewAuthorValidation,
  updateAuthorValidation,
  emailAndPassword
} = require('../../middleware/validation');

// GET request for all Author
const getAlldata = (req, res, next) => {
  models.author
    .findAll()
    .then(result => {
      if (!result) {
        next({ message: 'Right now there is no authors', statusCode: 404 });
        return;
      }
      res.send(result);
    })
    .catch(err => next({ message: err.message, statusCode: 400 }));
};

// GET request for one Author
const getByid = (req, res, next) => {
  const { id } = req.params;
  models.author
    .findByPk(id)
    .then(result => {
      if (!result) {
        next({ message: 'Given author id is not Exist', statusCode: 404 });
        return;
      }
      res.send(result.dataValues);
    })
    .catch(err => next({ message: err.message, statusCode: 404 }));
};

// POST request for Add author
const addAuthor = async (req, res, next) => {
  const { error } = insertNewAuthorValidation(req.body);
  if (error) {
    next({ message: error.details[0].message, statusCode: 400 });
    return;
  }

  models.author
    .create(req.body)
    .then(() => res.send('Author will be added successfully'))
    .catch(err => next({ message: err.parent.detail, statusCode: 400 }));
};

// PUT request for update author
const update = (req, res, next) => {
  const { id } = req.params;
  models.author
    .findByPk(id)
    .then(result => {
      if (!result) {
        next({ message: 'Given author id is not Exist', statusCode: 404 });
        return;
      }
      const { error } = updateAuthorValidation(req.body);
      if (error) {
        next({ message: error.details[0].message, statusCode: 400 });
      } else {
        models.author
          .update(
            {
              authorname: req.body.authorname,
              authoremail: req.body.authoremail,
              numofpost: req.body.numofpost
            },
            { where: { id: id } }
          )
          .then(() => res.send('update the author values'))
          .catch(err => {
            next({ message: err, statusCode: 400 });
          });
      }
    })
    .catch(err => next({ message: err.message, statusCode: 404 }));
};

// DELETE author
const deleteAuth = (req, res, next) => {
  const { id } = req.params;
  models.author
    .findByPk(id)
    .then(result => {
      if (!result) {
        next({
          message: 'Given author id is not exist',
          statusCode: 404
        });
        return;
      }
      models.author
        .destroy({ where: { id: id } })
        .then(() => res.send('Author deleted successfully'))
        .catch(err => next({ message: err.message, statusCode: 404 }));
    })
    .catch(err => next({ message: err.message, statusCode: 404 }));
};

// POST request for login admin
const login = async (req, res, next) => {
  const { error } = emailAndPassword(req.body);
  if (error) {
    next({ message: error.details[0].message, statusCode: 400 });
    return;
  }
  const user = await models.user.findOne({
    where: { username: req.body.username }
  });
  if (!user) {
    next({ message: 'username or password invalid', statusCode: 404 });
    return;
  }
  const validPass = await bcrypt.compare(
    req.body.password,
    user.dataValues.password
  );

  if (!validPass) {
    next({ message: 'Invalid password', statusCode: 400 });
    return;
  }

  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign(
    // eslint-disable-next-line no-underscore-dangle
    { _id: user.dataValues.id },
    process.env.TOKEN_SECRET
  );
  res.header('auth-token', token).send(token);
};

// Export HTTP request
module.exports = {
  getByid,
  getAlldata,
  addAuthor,
  update,
  deleteAuth,
  login
};
