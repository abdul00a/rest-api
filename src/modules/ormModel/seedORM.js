const faker = require('faker');
const bcrypt = require('bcryptjs');
const { models } = require('../ormModel');

// sync table with sequlize
const createTable = async () => {
  await models.sequelize.sync();
};

// create fake authors data
function fakeAuthors(numOfFakeData) {
  const fakeDetails = [];
  try {
    while (numOfFakeData) {
      const fakeData = {};
      fakeData.authorname = faker.fake('{{name.findName}}');
      fakeData.authoremail = faker.fake('{{internet.email}}');
      fakeData.numofpost = Math.ceil(Math.random() * 5);
      fakeDetails.push(fakeData);
      numOfFakeData--;
    }
  } catch (error) {
    console.log(error);
  }
  return fakeDetails;
}

const author = fakeAuthors(10);

// create fake post data
function fakePosts(fakeObj) {
  const fakeDetails = [];
  let id = 1;
  fakeObj.forEach(postcount => {
    let count = postcount.numofpost;
    while (count) {
      const fakeData = {};
      fakeData.posts = faker.random.words();
      fakeData.authorid = id;
      count--;
      fakeDetails.push(fakeData);
    }
    id++;
  });
  return fakeDetails;
}

const posts = fakePosts(author);

// create fake user data
async function user() {
  const salt = await bcrypt.genSalt(10);
  const hasPassword = await bcrypt.hash('admin123', salt);
  const userObj = {};
  const data = [];
  userObj.username = 'adminUser';
  userObj.password = hasPassword;
  userObj.role = 'admin';
  data.push(userObj);
  return data;
}

// insert fake authors into author table
const insertAuthors = async () => {
  await models.author
    .sync({ force: true })
    .then(() => models.author.bulkCreate(author))
    .catch(error => console.log(error));
};

// insert fake post into post table
const insertPosts = async () => {
  await models.post
    .sync({ force: true })
    .then(() => models.post.bulkCreate(posts))
    .catch(error => console.log(error));
};

// insert fake user into user table
const insertOneUser = async data => {
  await models.user
    .sync({ force: true })
    .then(() => models.user.bulkCreate(data))
    .catch(error => console.log(error));
};

async function main() {
  await createTable();
  await insertAuthors();
  await insertPosts();
  const data = await user();
  await insertOneUser(data);
}

main();
