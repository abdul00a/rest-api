// import Router function from express
const { Router } = require('express');
const { auth } = require('../utils/verifyToken');

// import controller function of authors with sequelize.
const {
  getByid,
  getAlldata,
  addAuthor,
  update,
  deleteAuth,
  login
} = require('../controller/ORMcontroller/author');

// import controller function of authors without sequelize.
const {
  getUsers,
  getUsersById,
  addAuthors,
  updateAuthors,
  deleteAuthors
} = require('../controller/authorController');

const authorRouter = Router();

// Home router handler
authorRouter.get('/', (req, res) => {
  res.send('This is could be a home route.....');
});

// authorRouter handler for author without sequlize data

// authorRouter.get('/author', getUsers);
// authorRouter.get('/author/:id', getUsersById);
// authorRouter.post('/author', addAuthors);
// authorRouter.put('/author/:id', updateAuthors);
// authorRouter.delete('/author/:id', deleteAuthors);

// authorRouter handler for author with sequlize data

authorRouter.get('/author', auth, getAlldata);
authorRouter.get('/author/:id', auth, getByid);
authorRouter.post('/author', auth, addAuthor);
authorRouter.put('/author/:id', auth, update);
authorRouter.delete('/author/:id', auth, deleteAuth);

// router for login crenditional
authorRouter.post('/login', login);

// export router handler
module.exports = {
  authorRouter
};
