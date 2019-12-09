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
  try {
    return client.query('insert into author values ($1, $2, $3, $4)', value);
  } catch (error) {
    throw new Error(error);
  }
};

const updateAuthor = value => {
  try {
    return client.query(
      'update author set authorname = $1 ,authoremail = $2, numofpost = $3 where id = $4',
      value
    );
  } catch (error) {
    throw new Error(error);
  }
};

const deleteAuthor = async id => {
  try {
    const singleAuthorObj = await getAuthorById(id);
    if (singleAuthorObj.rows.length !== 0) {
      const deldata = await client.query('delete from author where id = $1', [
        id
      ]);
      await client.query('delete from posttbl where refid = $1', [id]);
      return deldata;
    }
    throw new Error('Data is already deleted');
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAuthor,
  getAuthorById,
  insertAuthor,
  updateAuthor,
  deleteAuthor
};
