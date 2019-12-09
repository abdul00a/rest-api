const {
  getAuthor,
  getAuthorById,
  insertAuthor,
  updateAuthor,
  deleteAuthor
} = require('../modules/authors');

const getUsers = (req, res, next) => {
  getAuthor()
    .then(allVal => {
      if (allVal.rows.length !== 0) {
        res.send(allVal.rows);
      } else {
        throw new Error(
          next({
            message: 'Right now there is no Author is avilable',
            statusCode: 404
          })
        );
      }
    })
    .catch(err => {
      return next({ message: `${err} in query`, statusCode: 400 });
    });
};

const getUsersById = (req, res, next) => {
  const { id } = req.params;
  getAuthorById(id)
    .then(singleVal => {
      if (singleVal.rows.length !== 0) {
        res.send(singleVal.rows);
      } else {
        throw new Error(
          next({ message: `id ${id} is not found`, statusCode: 404 })
        );
      }
    })
    .catch(err => {
      return next({ message: `${err} in query`, statusCode: 400 });
    });
};

const addAuthors = (req, res) => {
  const val = Object.values(req.body);
  insertAuthor(val).then(() => res.send('Author will be added successfully'));
};

const updateAuthors = (req, res) => {
  const { id } = req.params;
  const updatVal = Object.values(req.body);
  const val = [...updatVal, id];
  updateAuthor(val).then(() => res.send('update the author values'));
};

const deleteAuthors = (req, res) => {
  const { id } = req.params;
  deleteAuthor(id).then(() => res.send('delete Author successfully'));
};

module.exports = {
  getUsers,
  getUsersById,
  addAuthors,
  updateAuthors,
  deleteAuthors
};
