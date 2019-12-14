// import client connection
const { client } = require('../config/config');

// return all Posts corresponding to one author
const getPosts = id => {
  return client.query('select * from posttbl where refid = $1', [id]);
};

// return one Post corresponding to one author
const getPostsById = (id, postid) => {
  return client.query(
    'select posttbl.postid,posttbl.refid,posttbl.posts from posttbl inner join author on posttbl.refid = $1 where postid = $2 limit 1;',
    [id, postid]
  );
  // return client.query(
  //   'select posttbl.postid,posttbl.refid,posttbl.posts from posttbl inner join author on posttbl.refid = author.id where author.id=$1 and posttbl.postid=$2',
  //   [id, postid]
  // );
};

// insert Post in Post table corresponding to author id
const insertPost = value => {
  return client.query('insert into posttbl values ($1, $2, $3)', value);
};

// update Post value in Post table corresponding to author id
const updatePosts = value => {
  return client.query('update posttbl set posts = $1 where postid = $2', value);
};

// delete Post from Post table corresponding to author id
const del = postid => {
  return client.query('delete from posttbl where postid = $1', [postid]);
};

// export CURD query functions of Post
module.exports = {
  getPosts,
  getPostsById,
  insertPost,
  updatePosts,
  del
};
