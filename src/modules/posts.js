const { client } = require('../utils/connection');

const getPosts = () => {
  return client.query('select * from posttbl');
};

const getPostsById = id => {
  return client.query('select * from posttbl where id = $1', [id]);
};

const insertPost = value => {
  return client.query('insert into posttbl values ($1, $2, $3)', value);
};

const updatePosts = value => {
  return client.query('update posttbl set posts = $1 where id = $2', value);
};

const del = async id => {
  const singlePostObj = await getPostsById(id);
  let deldata;
  if (singlePostObj.rows.length !== 0) {
    deldata = await client.query('delete from psttbl where id = $1', [id]);
  } else {
    throw new Error('Data is already deleted');
  }
  return deldata;
};

module.exports = {
  getPosts,
  getPostsById,
  insertPost,
  updatePosts,
  del
};
