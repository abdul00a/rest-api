const Sequelize = require('sequelize');

const { sequelize } = require('../../utils/db');

const models = {
  author: sequelize.import('./author'),
  post: sequelize.import('./post'),
  user: sequelize.import('./admin')
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = { models };
