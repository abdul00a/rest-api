const {
  getAuthor,
  getAuthorById,
  insertAuthor,
  updateAuthor,
  deleteAuthor
} = require('../modules/authors');

const {
  usersByIDvalidation,
  insertNewAuthorValidation,
  updateAuthorValidation
} = require('../utils/validation');

const getUsers = (req, res, next) => {
  getAuthor()
    .then(allVal => {
      if (allVal.rows.length !== 0) {
        res.send(allVal.rows);
      } else {
        next({
          message: 'oppsss somthing worng please check again....',
          statusCode: 404
        });
      }
    })
    .catch(err => {
      next({ message: err.message, statusCode: 400 });
    });
};

const getUsersById = (req, res, next) => {
  const [id, validate] = usersByIDvalidation(req.params);
  if (validate.error) {
    next({ message: validate.error.details[0].message, statusCode: 400 });
  } else {
    getAuthorById(id)
      .then(singleVal => {
        if (singleVal.rows.length !== 0) {
          res.send(singleVal.rows);
        } else {
          next({ message: `id ${id} is not found`, statusCode: 404 });
        }
      })
      .catch(err => {
        next({ message: err.message, statusCode: 400 });
      });
  }
};

const addAuthors = (req, res, next) => {
  const { error } = insertNewAuthorValidation(req.body);
  const val = Object.values(req.body);
  if (error) {
    next({ message: error.details[0].message, statusCode: 400 });
  } else {
    insertAuthor(val)
      .then(() => res.send('Author will be added successfully'))
      .catch(err => {
        next({ message: err.message, statusCode: 400 });
      });
  }
};

const updateAuthors = async (req, res, next) => {
  const [id, validate] = usersByIDvalidation(req.params);
  const { error } = updateAuthorValidation(req.body);
  if (validate.error) {
    next({ message: validate.error.details[0].message, statusCode: 400 });
  } else if (error) {
    next({ message: error.details[0].message, statusCode: 400 });
  } else {
    const isIdAvail = await getAuthorById(id);
    if (isIdAvail.rows.length !== 0) {
      const updatVal = Object.values(req.body);
      const val = [...updatVal, id];
      updateAuthor(val)
        .then(() => res.send('update the author values'))
        .catch(err => {
          next({ message: err.message, statusCode: 400 });
        });
    } else {
      next({
        message: `This ${id} id is not avilable in author table. please try different id to update`,
        statusCode: 404
      });
    }
  }
};

const deleteAuthors = (req, res, next) => {
  const [id, validate] = usersByIDvalidation(req.params);
  if (validate.error) {
    next({ message: validate.error.details[0].message, statusCode: 400 });
  } else {
    deleteAuthor(id)
      .then(() => res.send('delete Author successfully'))
      .catch(err => {
        next({ message: err.message, statusCode: 400 });
      });
  }
};

module.exports = {
  getUsers,
  getUsersById,
  addAuthors,
  updateAuthors,
  deleteAuthors
};
