// import client connection
const { client } = require('../utils/connection');

// return all Posts
const getPosts = () => {
  return client.query('select * from posttbl');
};

// return one Post corresponding to Post id
const getPostsById = id => {
  return client.query('select * from posttbl where id = $1', [id]);
};

// insert Post in Post table
const insertPost = value => {
  return client.query('insert into posttbl values ($1, $2, $3)', value);
};

// update Post value in Post table
const updatePosts = value => {
  return client.query('update posttbl set posts = $1 where id = $2', value);
};

// delete Post from Post table
const del = async id => {
  const singlePostObj = await getPostsById(id);
  let deldata;
  if (singlePostObj.rows.length !== 0) {
    deldata = await client.query('delete from psttbl where id = $1', [id]);
  } else {
    throw new Error(
      `Either a given id ${id} is not avilable in table or may be deleted `
    );
  }
  return deldata;
};

// export CURD query functions of Post
module.exports = {
  getPosts,
  getPostsById,
  insertPost,
  updatePosts,
  del
};
