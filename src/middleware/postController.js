// import module functions for post table
const {
  getPosts,
  getPostsById,
  insertPost,
  updatePosts,
  del
} = require('../modules/posts');

// import validation function
const {
  usersByIDvalidation,
  NewPostValidation,
  updatePostValidation
} = require('../utils/validation');

// GET request middleware function for all Posts
const getAllPost = (req, res, next) => {
  getPosts()
    .then(allVal => {
      if (allVal.rows.length !== 0) {
        res.send(allVal.rows);
      } else {
        next({
          message: 'oppsss somthing worng please check again....',
          statusCode: 404
        });
      }
    })
    .catch(err => {
      next({ message: err.message, statusCode: 400 });
    });
};

// GET request middleware function for one Posts
const getpostById = (req, res, next) => {
  const [id, validate] = usersByIDvalidation(req.params);
  if (validate.error) {
    next({ message: validate.error.details[0].message, statusCode: 400 });
  } else {
    getPostsById(id)
      .then(singleVal => {
        if (singleVal.rows.length !== 0) {
          res.send(singleVal.rows);
        } else {
          next({ message: `id ${id} is not found`, statusCode: 404 });
        }
      })
      .catch(err => {
        next({ message: err.message, statusCode: 400 });
      });
  }
};

// POST request middleware function for insert one Posts
const addNewPost = (req, res, next) => {
  const val = Object.values(req.body);
  const { error } = NewPostValidation(req.body);
  if (error) {
    next({ message: error.details[0].message, statusCode: 400 });
  } else {
    insertPost(val)
      .then(() => res.send('New post will be added successfully'))
      .catch(err => {
        next({ message: err.message, statusCode: 400 });
      });
  }
};

// PUT request middleware function for update one Posts
const updatePost = async (req, res, next) => {
  const [id, validate] = usersByIDvalidation(req.params);
  const { error } = updatePostValidation(req.body);
  if (validate.error) {
    next({ message: validate.error.details[0].message, statusCode: 400 });
  } else if (error) {
    next({ message: error.details[0].message, statusCode: 400 });
  } else {
    const isIdAvail = await getPostsById(id);
    if (isIdAvail.rows.length !== 0) {
      const updatVal = Object.values(req.body);
      const val = [...updatVal, id];
      updatePosts(val)
        .then(() => res.send('update the post name'))
        .catch(err => {
          next({ message: err.message, statusCode: 400 });
        });
    } else {
      next({
        message: `This ${id} id is not avilable in author table. please try diff id`,
        statusCode: 404
      });
    }
  }
};

// DELETE request middleware function for delete one Posts
const deletePost = (req, res, next) => {
  const [id, validate] = validateID(req.params);
  if (validate.error) {
    next({ message: validate.error.details[0].message, statusCode: 400 });
  } else {
    del(id)
      .then(() => res.send('delete post successfully'))
      .catch(err => {
        next({ message: err.message, statusCode: 400 });
      });
  }
};

// Export alll middleware function
module.exports = {
  getAllPost,
  getpostById,
  addNewPost,
  updatePost,
  deletePost
};
