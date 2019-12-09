const { client } = require('../utils/connection');

const getAuthor = () => {
  try {
    return client.query('select * from author');
  } catch (error) {
    throw new Error(error);
  }
};

const getAuthorById = id => {
  try {
    return client.query('select * from author where id = $1', [id]);
  } catch (error) {
    throw new Error(error);
  }
};

const insertAuthor = value => {
  return client.query('insert into author values ($1, $2, $3, $4)', value);
};

const updateAuthor = value => {
  return client.query(
    'update author set authorname = $1 ,authoremail = $2, numofpost = $3 where id = $4',
    value
  );
};

const deleteAuthor = async id => {
  const deldata = await client.query('delete from author where id = $1', [id]);
  await client.query('delete from posttbl where refid = $1', [id]);
  return deldata;
};

module.exports = {
  getAuthor,
  getAuthorById,
  insertAuthor,
  updateAuthor,
  deleteAuthor
};
