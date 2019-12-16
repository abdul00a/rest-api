// import Router function from express
const { Router } = require('express');
const { auth } = require('../utils/verifyToken');

// import controller function of Posts without sequlize.
const {
  allPostOfOneAuthor,
  onePostOfOneAuthor,
  insertPost,
  deletePosts,
  updatepost
} = require('../controller/ORMcontroller/post');

// import controller function of Posts without sequlize.
const {
  getAllPost,
  getpostById,
  addNewPost,
  updatePost,
  deletePost
} = require('../controller/postController');

const postRouter = Router();

// router handler for author post without ORM

// postRouter.get('/:id/posts/', getAllPost);
// postRouter.get('/:id/posts/:postid', getpostById);
// postRouter.post('/:id/posts/', addNewPost);
// postRouter.put('/:id/posts/:postid', updatePost);
// postRouter.delete('/:id/posts/:postid', deletePost);

// router handler for author post with ORM
postRouter.get('/:id/posts/', auth, allPostOfOneAuthor);
postRouter.get('/:id/posts/:postid', auth, onePostOfOneAuthor);
postRouter.post('/:id/posts/', auth, insertPost);
postRouter.put('/:id/posts/:postid', auth, updatepost);
postRouter.delete('/:id/posts/:postid', auth, deletePosts);

// export router handler
module.exports = {
  postRouter
};
