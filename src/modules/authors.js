// import client connection
const { client } = require('../utils/config');

// return all authors
const getAuthor = () => {
  return client.query('select * from author');
};

// return one authors corresponding to author id
const getAuthorById = id => {
  return client.query('select * from author where id = $1', [id]);
};

// insert author in author table
const insertAuthor = value => {
  return client.query('insert into author values ($1, $2, $3, $4)', value);
};

// update author value in author table
const updateAuthor = value => {
  return client.query(
    'update author set authorname = $1 ,authoremail = $2, numofpost = $3 where id = $4',
    value
  );
};

// delete author from author table and delete posts corresponding to author
const deleteAuthor = async id => {
  return client.query('delete from author where id = $1', [id]);
};

// export CURD query functions of author
module.exports = {
  getAuthor,
  getAuthorById,
  insertAuthor,
  updateAuthor,
  deleteAuthor
};
