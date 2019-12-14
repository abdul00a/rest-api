const faker = require('faker');
const { models } = require('../ormModel');

const createTable = async () => {
  await models.sequelize.sync();
};

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

const insertAuthors = async () => {
  await models.author
    .sync({ force: true })
    .then(() => models.author.bulkCreate(author))
    .catch(error => console.log(error));
};

const insertPosts = async () => {
  await models.post
    .sync({ force: true })
    .then(() => models.post.bulkCreate(posts))
    .catch(error => console.log(error));
};
async function main() {
  await createTable();
  await insertAuthors();
  await insertPosts();
}

main();
