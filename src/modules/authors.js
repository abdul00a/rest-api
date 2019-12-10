const { client } = require('../utils/connection');

const getAuthor = () => {
  return client.query('select * from author');
};

const getAuthorById = id => {
  return client.query('select * from author where id = $1', [id]);
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
  const singleAuthorObj = await getAuthorById(id);
  let deldata;
  if (singleAuthorObj.rows.length !== 0) {
    deldata = await client.query('delete from author where id = $1', [id]);
    await client.query('delete from posttbl where refid = $1', [id]);
  } else {
    throw new Error(
      `Either a given id ${id} is not avilable in table or may be deleted `
    );
  }
  return deldata;
};

module.exports = {
  getAuthor,
  getAuthorById,
  insertAuthor,
  updateAuthor,
  deleteAuthor
};
