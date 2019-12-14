// import Router function from express
const { Router } = require('express');

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
postRouter.get('/:id/posts/', allPostOfOneAuthor);
postRouter.get('/:id/posts/:postid', onePostOfOneAuthor);
postRouter.post('/:id/posts/', insertPost);
postRouter.put('/:id/posts/:postid', updatepost);
postRouter.delete('/:id/posts/:postid', deletePosts);

// export router handler
module.exports = {
  postRouter
};
