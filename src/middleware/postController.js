const {
  getPosts,
  getPostsById,
  insertPost,
  updatePosts,
  del
} = require('../modules/posts');

const getAllPost = (req, res, next) => {
  getPosts()
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

const getpostById = (req, res, next) => {
  const { id } = req.params;
  getPostsById(id)
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
