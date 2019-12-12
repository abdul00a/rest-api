// import Router function from express
const { Router } = require('express');

// import middleware function of authors.
const {
  getUsers,
  getUsersById,
  addAuthors,
  updateAuthors,
  deleteAuthors
} = require('../middleware/authorController');

const authorRouter = Router();

// Home router handler
authorRouter.get('/', (req, res) => {
  res.send('This is could be a home route.....');
});

// authorRouter handler for authors
authorRouter.get('/author', getUsers);
authorRouter.get('/author/:id', getUsersById);
authorRouter.post('/author', addAuthors);
authorRouter.put('/author/:id', updateAuthors);
authorRouter.delete('/author/:id', deleteAuthors);

// export router handler
module.exports = {
  authorRouter
};
