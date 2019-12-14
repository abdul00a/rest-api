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
  validationAuthorIDpostID,
  NewPostValidation,
  updatePostValidation
} = require('../middleware/validation');

// GET request middleware function for all Posts
const getAllPost = (req, res, next) => {
  const [id, validate] = usersByIDvalidation(req.params);
  if (validate.error) {
    next({ message: validate.error.details[0].message, statusCode: 400 });
  } else {
    getPosts(id)
      .then(allVal => {
        if (allVal.rows.length !== 0) {
          res.send(allVal.rows);
        } else {
          next({
            message: `oppsss somthing worng please check again author id${id}....`,
            statusCode: 404
          });
        }
      })
      .catch(err => {
        next({ message: err.message, statusCode: 400 });
      });
  }
};

// GET request middleware function for one Posts with corresponding to author id
const getpostById = (req, res, next) => {
  const [id, postid, validate] = validationAuthorIDpostID(req.params);
  if (validate.error) {
    next({ message: validate.error.details[0].message, statusCode: 400 });
  } else {
    getPostsById(id, postid)
      .then(singleVal => {
        if (singleVal.rows.length !== 0) {
          res.send(singleVal.rows);
        } else {
          next({
            message: `postid ${postid} is not found corressponding to author id ${id}`,
            statusCode: 404
          });
        }
      })
      .catch(err => {
        next({ message: err.message, statusCode: 400 });
      });
  }
};

// POST request middleware function for insert one Posts corresponding to author id
const addNewPost = (req, res, next) => {
  if (+req.params.id === +req.body.refid) {
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
  } else {
    next({
      message: 'refid must be same authod id to insert new Post',
      statusCode: 400
    });
  }
};

// PUT request middleware function for update one Posts i.e. corresponding to author id
const updatePost = async (req, res, next) => {
  const [id, postid, validate] = validationAuthorIDpostID(req.params);
  const { error } = updatePostValidation(req.body);
  if (validate.error) {
    next({ message: validate.error.details[0].message, statusCode: 400 });
  } else if (error) {
    next({ message: error.details[0].message, statusCode: 400 });
  } else {
    const isIdAvail = await getPostsById(id, postid);
    console.log(isIdAvail);
    if (isIdAvail.rows.length !== 0) {
      const updatVal = Object.values(req.body);
      const val = [...updatVal, postid];
      updatePosts(val)
        .then(() => res.send('update the post name successfully'))
        .catch(err => {
          next({ message: err.message, statusCode: 400 });
        });
    } else {
      next({
        message: `This post is not avilable in post table. please insert first and try again`,
        statusCode: 404
      });
    }
  }
};

// DELETE request middleware function for delete one Posts for one author
const deletePost = async (req, res, next) => {
  const [id, postid, validate] = validationAuthorIDpostID(req.params);
  if (validate.error) {
    next({ message: validate.error.details[0].message, statusCode: 400 });
  } else {
    try {
      const singlePostObj = await getPostsById(id, postid);
      if (singlePostObj.rows.length !== 0) {
        del(postid)
          .then(() => res.send('delete post successfully'))
          .catch(err => {
            next({ message: err.message, statusCode: 400 });
          });
      } else {
        next({
          message: `Either a given post id ${postid} is not avilable in table or may be deleted `,
          statusCode: 404
        });
        return;
      }
    } catch (error) {
      next({ message: error.message, statusCode: 400 });
    }
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
