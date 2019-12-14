const Sequelize = require('sequelize');
const { models } = require('../../modules/ormModel');
const {
  PostValidationOrm,
  updatePostValidation
} = require('../../middleware/validation');

const allPostOfOneAuthor = (req, res, next) => {
  const { id } = req.params;
  models.author
    .findByPk(id)
    .then(result => {
      if (!result) {
        next({
          message: 'Given author id is not avialable',
          statusCode: 404
        });
        return;
      }
      models.post
        .findAll({ where: { authorid: id } })
        .then(posts => {
          if (posts.length === 0) {
            next({
              message: 'Given author id does not have any post',
              statusCode: 404
            });
            return;
          }
          res.send(posts);
        })
        .catch(err => next({ message: err.message, statusCode: 400 }));
    })
    .catch(err => next({ message: err.message, statusCode: 400 }));
};

const onePostOfOneAuthor = (req, res, next) => {
  const { id, postid } = req.params;
  models.author
    .findByPk(id)
    .then(result => {
      if (!result) {
        next({
          message: 'Given author id does not have any post.........',
          statusCode: 404
        });
        return;
      }
      models.post
        .findAll({
          attributes: Object.keys(models.post.rawAttributes),
          include: [
            {
              model: models.author,
              required: true,
              attributes: []
            }
          ],
          where: {
            [Sequelize.Op.and]: [
              { '$authororm.id$': { [Sequelize.Op.eq]: id } },
              { '$postorm.postid$': { [Sequelize.Op.eq]: postid } }
            ]
          }
        })
        .then(post => {
          if (post.length === 0) {
            next({
              message: 'Given post id not avilable.........',
              statusCode: 404
            });
            return;
          }
          res.send(post);
        })
        .catch(err => next({ message: err.message, statusCode: 400 }));
    })
    .catch(err => next({ message: err.message, statusCode: 400 }));
};

const insertPost = (req, res, next) => {
  const { id } = req.params;
  models.author
    .findByPk(id)
    .then(async result => {
      if (!result) {
        next({ message: 'Given id is not avilable', statusCode: 404 });
        return;
      }
      if (+req.params.id === +req.body.authorid) {
        const { error } = PostValidationOrm(req.body);
        if (error) {
          next({ message: error.details[0].message, statusCode: 400 });
          return;
        }
        const idExit = await models.author.findOne({ postid: req.body.postid });
        if (idExit) {
          next({ message: 'postID is already Exist', statusCode: 400 });
          return;
        }
        models.post
          .create(req.body)
          .then(() => res.send('Post will be successfully added'))
          .catch(err => next({ message: err.parent.detail, statusCode: 400 }));
      } else {
        next({
          message:
            'authorid must be same as author table id to insert new Post',
          statusCode: 400
        });
      }
    })
    .catch(err => next({ message: err.message, statusCode: 404 }));
};

const deletePosts = (req, res, next) => {
  const { id, postid } = req.params;
  models.author
    .findByPk(id)
    .then(result => {
      if (!result) {
        next({
          message:
            'Given author id does not have any post you can not delete post.........',
          statusCode: 404
        });
        return;
      }
      models.post
        .findAll({
          attributes: Object.keys(models.post.rawAttributes),
          include: [
            {
              model: models.author,
              required: true,
              attributes: []
            }
          ],
          where: {
            [Sequelize.Op.and]: [
              { '$authororm.id$': { [Sequelize.Op.eq]: id } },
              { '$postorm.postid$': { [Sequelize.Op.eq]: postid } }
            ]
          }
        })
        .then(post => {
          if (post.length === 0) {
            next({
              message:
                'Given post id is already deleted or not avialable.........',
              statusCode: 404
            });
            return;
          }
          models.post
            .destroy({ where: { postid: postid } })
            .then(() => res.send('post deleted successfully'))
            .catch(err => next({ message: err.message, statusCode: 404 }));
        })
        .catch(err => next({ message: err.message, statusCode: 400 }));
    })
    .catch(err => next({ message: err.message, statusCode: 400 }));
};

const updatepost = (req, res, next) => {
  const { id, postid } = req.params;
  models.author
    .findByPk(id)
    .then(result => {
      if (!result) {
        next({
          message:
            'Given author id does not have any post you can not delete post.........',
          statusCode: 404
        });
        return;
      }
      models.post
        .findAll({
          include: [
            {
              model: models.author,
              required: true,
              attributes: []
            }
          ],
          attributes: Object.keys(models.post.rawAttributes),
          where: {
            [Sequelize.Op.and]: [
              { '$authororm.id$': { [Sequelize.Op.eq]: id } },
              { '$postorm.postid$': { [Sequelize.Op.eq]: postid } }
            ]
          }
        })
        .then(post => {
          if (post.length === 0) {
            next({
              message:
                'Given post id is already deleted or not avialable.........',
              statusCode: 404
            });
            return;
          }
          const { error } = updatePostValidation(req.body);
          if (error) {
            next({ message: error.details[0].message, statusCode: 400 });
          } else {
            models.post
              .update({ posts: req.body.posts }, { where: { postid: postid } })
              .then(() => res.send('update the post values'))
              .catch(err => {
                next({ message: err, statusCode: 400 });
              });
          }
        })
        .catch(err => next({ message: err.message, statusCode: 400 }));
    })
    .catch(err => next({ message: err.message, statusCode: 400 }));
};

module.exports = {
  allPostOfOneAuthor,
  onePostOfOneAuthor,
  insertPost,
  deletePosts,
  updatepost
};
