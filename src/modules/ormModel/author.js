// author table schema
module.exports = (sequelize, Datatype) => {
  const author = sequelize.define(
    'authororm',
    {
      id: {
        type: Datatype.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      authorname: Datatype.STRING,
      authoremail: Datatype.STRING,
      numofpost: Datatype.INTEGER
    },
    {
      timestamps: false
    }
  );

  return author;
};
