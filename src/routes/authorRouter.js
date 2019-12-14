// import Router function from express
const { Router } = require('express');

// import controller function of authors with sequelize.
const {
  getByid,
  getAlldata,
  addAuthor,
  update,
  deleteAuth
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

authorRouter.get('/author', getAlldata);
authorRouter.get('/author/:id', getByid);
authorRouter.post('/author', addAuthor);
authorRouter.put('/author/:id', update);
authorRouter.delete('/author/:id', deleteAuth);

// export router handler
module.exports = {
  authorRouter
};
