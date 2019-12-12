// import modules functions for author table
const {
  getAuthor,
  getAuthorById,
  insertAuthor,
  updateAuthor,
  deleteAuthor
} = require('../modules/authors');

// import validation function
const {
  usersByIDvalidation,
  insertNewAuthorValidation,
  updateAuthorValidation
} = require('../utils/validation');

// GET request middleware function for all authors
const getUsers = (req, res, next) => {
  getAuthor()
    .then(allVal => {
      if (allVal.rows.length !== 0) {
        res.send(allVal.rows);
      } else {
        next({
          message: 'ooppsss somthing worng please check again URL....',
          statusCode: 404
        });
      }
    })
    .catch(err => {
      next({ message: err.message, statusCode: 400 });
    });
};

// GET request middleware function for one authors
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
          next({ message: `Id ${id} is not found`, statusCode: 404 });
        }
      })
      .catch(err => {
        next({ message: err.message, statusCode: 400 });
      });
  }
};

// POST request middleware function for insert one author
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

// PUT request middleware function for update one author
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
        message: `This ${id} id is not available in author table. please try different id to update`,
        statusCode: 404
      });
    }
  }
};

// DELETE request middleware function for delete one author
const deleteAuthors = async (req, res, next) => {
  const [id, validate] = usersByIDvalidation(req.params);
  if (validate.error) {
    next({ message: validate.error.details[0].message, statusCode: 400 });
  } else {
    try {
      const singleAuthorObj = await getAuthorById(id);
      if (singleAuthorObj.rows.length !== 0) {
        deleteAuthor(id)
          .then(() => res.send('delete Author successfully'))
          .catch(err => {
            next({ message: err.message, statusCode: 400 });
          });
      } else {
        next({
          message: `Either a given author id ${id} is not available in table or may be deleted `,
          statusCode: 404
        });
      }
    } catch (error) {
      next({ message: error.message, statusCode: 400 });
    }
  }
};

// Export alll middleware function
module.exports = {
  getUsers,
  getUsersById,
  addAuthors,
  updateAuthors,
  deleteAuthors
};
