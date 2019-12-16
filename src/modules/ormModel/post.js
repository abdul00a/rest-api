// post table schema
module.exports = (sequelize, Datatype) => {
  const post = sequelize.define(
    'postorm',
    {
      postid: {
        type: Datatype.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      posts: Datatype.STRING,
      authorid: Datatype.INTEGER
    },
    {
      timestamps: false
    }
  );

  post.associate = models => {
    post.belongsTo(models.author, {
      foreignKey: 'authorid',
      onDelete: 'cascade'
    });
  };
  return post;
};
