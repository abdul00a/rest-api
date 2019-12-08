const {
  getAuthor,
  getAuthorById,
  insertAuthor,
  updateAuthor,
  deleteAuthor
} = require('../modules/authors');

const getUsers = (req, res) => {
  getAuthor().then(val => res.send(val));
};

const getUsersById = (req, res) => {
  const { id } = req.params;
  getAuthorById(id).then(singleVal => res.send(singleVal.rows));
};

const addAuthors = (req, res) => {
  const val = Object.values(req.body);
  insertAuthor(val).then(() => res.send('Author will be added successfully'));
};

const updateAuthors = (req, res) => {
  const { id } = req.params;
  const updatVal = Object.values(req.body);
  const val = [...updatVal, id];
  updateAuthor(val).then(() => res.send('update the author data'));
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
