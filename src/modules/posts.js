const { client } = require('../utils/connection');

const getPosts = () => {
  try {
    return client.query('select * from posttbl');
  } catch (error) {
    throw new Error(error);
  }
};

const getPostsById = id => {
  try {
    return client.query('select * from posttbl where id = $1', [id]);
  } catch (error) {
    throw new Error(error);
  }
};

const insertPost = value => {
  try {
    return client.query('insert into posttbl values ($1, $2, $3)', value);
  } catch (error) {
    throw new Error(error);
  }
};

const updatePosts = value => {
  return client.query('update posttbl set posts = $1 where id = $2', value);
};

const del = id => {
  return client.query('delete from posttbl where id = $1', [id]);
};

module.exports = {
  getPosts,
  getPostsById,
  insertPost,
  updatePosts,
  del
};
