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

// import middleware function of Posts.
const {
  getAllPost,
  getpostById,
  addNewPost,
  updatePost,
  deletePost
} = require('../middleware/postController');

const router = Router();

// Home router handler
router.get('/', (req, res) => {
  res.send('This is could be a home route.....');
});

// Authors router handler
router.get('/api/author', getUsers);
router.get('/api/author/:id', getUsersById);
router.post('/api/author', addAuthors);
router.put('/api/author/:id', updateAuthors);
router.delete('/api/author/:id', deleteAuthors);

// Posts router handler
router.get('/api/posts', getAllPost);
router.get('/api/posts/:id', getpostById);
router.post('/api/posts', addNewPost);
router.put('/api/posts/:id', updatePost);
router.delete('/api/posts/:id', deletePost);

// export router handler
module.exports = {
  router
};
