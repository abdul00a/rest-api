// import Router function from express
const { Router } = require('express');

// import middleware function of Posts.
const {
  getAllPost,
  getpostById,
  addNewPost,
  updatePost,
  deletePost
} = require('../middleware/postController');

const postRouter = Router();

// relation router handler for author post
postRouter.get('/:id/posts/', getAllPost);
postRouter.get('/:id/posts/:postid', getpostById);
postRouter.post('/:id/posts/', addNewPost);
postRouter.put('/:id/posts/:postid', updatePost);
postRouter.delete('/:id/posts/:postid', deletePost);

// export router handler
module.exports = {
  postRouter
};
