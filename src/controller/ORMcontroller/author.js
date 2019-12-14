const { models } = require('../../modules/ormModel');

const {
  insertNewAuthorValidation,
  updateAuthorValidation
} = require('../../middleware/validation');

const getAlldata = (req, res, next) => {
  models.author
    .findAll()
    .then(result => {
      if (!result) {
        next({ message: 'Right now table is empty', statusCode: 404 });
        return;
      }
      res.send(result);
    })
    .catch(err => next({ message: err.message, statusCode: 400 }));
};

const getByid = (req, res, next) => {
  const { id } = req.params;
  models.author
    .findByPk(id)
    .then(result => {
      if (!result) {
        next({ message: 'Given id is not avilable', statusCode: 404 });
        return;
      }
      res.send(result.dataValues);
    })
    .catch(err => next({ message: err.message, statusCode: 404 }));
};

const addAuthor = async (req, res, next) => {
  const { error } = insertNewAuthorValidation(req.body);
  if (error) {
    next({ message: error.details[0].message, statusCode: 400 });
    return;
  }
  const idExit = await models.author.findOne({ id: req.body.id });
  if (idExit) {
    next({ message: 'Author ID is already Exist', statusCode: 400 });
    return;
  }
  models.author
    .create(req.body)
    .then(() => res.send('Author will be added successfully'))
    .catch(err => next({ message: err.parent.detail, statusCode: 400 }));
};

const update = (req, res, next) => {
  const { id } = req.params;
  models.author
    .findByPk(id)
    .then(result => {
      if (!result) {
        next({ message: 'Given id is not avilable', statusCode: 404 });
        return;
      }
      const { error } = updateAuthorValidation(req.body);
      if (error) {
        next({ message: error.details[0].message, statusCode: 400 });
      } else {
        models.author
          .update(
            {
              authorname: req.body.authorname,
              authoremail: req.body.authoremail,
              numofpost: req.body.numofpost
            },
            { where: { id: id } }
          )
          .then(() => res.send('update the author values'))
          .catch(err => {
            next({ message: err, statusCode: 400 });
          });
      }
    })
    .catch(err => next({ message: err.message, statusCode: 404 }));
};

const deleteAuth = (req, res, next) => {
  const { id } = req.params;
  models.author
    .findByPk(id)
    .then(result => {
      if (!result) {
        next({
          message: 'Given id is not avilable to delete author',
          statusCode: 404
        });
        return;
      }
      models.author
        .destroy({ where: { id: id } })
        .then(() => res.send('Author deleted successfully'))
        .catch(err => next({ message: err.message, statusCode: 404 }));
    })
    .catch(err => next({ message: err.message, statusCode: 404 }));
};

module.exports = {
  getByid,
  getAlldata,
  addAuthor,
  update,
  deleteAuth
};
