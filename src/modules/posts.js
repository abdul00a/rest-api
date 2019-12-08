const { client } = require('../utils/connection');

const getPosts = async () => {
  const authorObj = await client.query('select * from posttbl');
  return authorObj.rows;
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
