const {
  getPosts,
  getPostsById,
  insertPost,
  updatePosts,
  del
} = require('../modules/posts');

const getAllPost = (req, res) => {
  getPosts().then(val => res.send(val));
};

const getpostById = (req, res) => {
  const { id } = req.params;
  getPostsById(id).then(singleVal => res.send(singleVal.rows));
};

const addNewPost = (req, res) => {
  const val = Object.values(req.body);
  insertPost(val).then(() => res.send('New post will be added successfully'));
};

const updatePost = (req, res) => {
  const { id } = req.params;
  const updatVal = Object.values(req.body);
  const val = [...updatVal, id];
  updatePosts(val).then(() => res.send('update the post name'));
};

const deletePost = (req, res) => {
  const { id } = req.params;
  del(id).then(() => res.send('delete post successfully'));
};

module.exports = {
  getAllPost,
  getpostById,
  addNewPost,
  updatePost,
  deletePost
};
