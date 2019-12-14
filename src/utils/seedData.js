// import faker function and client function
const faker = require('faker');
const { client } = require('../config/config');

// insert query for post table
function insertData1(value) {
  return client.query('INSERT INTO postTbl VALUES ($1, $2, $3)', value);
}

// insert query for author table
function insertData(value) {
  return client.query('INSERT INTO author VALUES ($1, $2, $3, $4)', value);
}

// create table for author
async function createTables(fakeData) {
  try {
    await client.query('DROP TABLE IF EXISTS author CASCADE');
    await client.query(
      'CREATE TABLE author (id INT PRIMARY KEY,authorName VARCHAR(30),authorEmail VARCHAR(60), numofpost INT)'
    );
    await Promise.all(
      fakeData.map(ele =>
        insertData([
          fakeData.indexOf(ele) + 1,
          ele.authorName,
          ele.authorEmail,
          ele.numofpost
        ])
      )
    );
  } catch (err) {
    console.log(err);
  }
}

// create table for posts
async function createTables1(data) {
  try {
    await client.query('DROP TABLE IF EXISTS postTbl CASCADE');
    await client.query(
      'CREATE TABLE postTbl (postID INT PRIMARY KEY,refID INT REFERENCES author(id) ON DELETE CASCADE, posts VARCHAR(60))'
    );
    await Promise.all(
      data.map((ele, i) => insertData1([i + 1, ele.refId, ele.postName]))
    );
  } catch (err) {
    console.log(err);
  }
}

// generate fake data for authors
function fakeAuthors(numOfFakeData) {
  const fakeDetails = [];
  try {
    while (numOfFakeData) {
      const data = {};
      data.authorName = faker.fake('{{name.findName}}');
      data.authorEmail = faker.fake('{{internet.email}}');
      data.numofpost = Math.ceil(Math.random() * 5);
      fakeDetails.push(data);
      numOfFakeData--;
    }
  } catch (error) {
    console.log(error);
  }
  return fakeDetails;
}

// generate fake data for Posts
async function fakePosts() {
  const fakeDetails = [];
  try {
    let authorID = 1;
    const count = await client.query('select * from author');
    let numOFdata = count.rowCount;
    while (numOFdata) {
      const numPost = await client.query(
        `select numofpost as post from author where id = ${authorID}`
      );
      let numPostVal = +numPost.rows[0].post;
      while (numPostVal) {
        const data = {};
        data.refId = authorID;
        data.postName = faker.random.words();
        numPostVal--;
        fakeDetails.push(data);
      }
      authorID++;
      numOFdata--;
    }
  } catch (error) {
    console.log(error);
  }
  return fakeDetails;
}

// main function for creating a table for author & post
async function main() {
  try {
    await client.connect();
    await createTables(await fakeAuthors(10));
    await createTables1(await fakePosts());
    await client.end();
  } catch (error) {
    console.log(error);
  }
}

main();
