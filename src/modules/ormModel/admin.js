// admin table schema
module.exports = (sequelize, Datatype) => {
  const user = sequelize.define(
    'users',
    {
      username: {
        type: Datatype.STRING,
        allowNull: false,
        required: true
      },
      password: { type: Datatype.STRING, required: true },
      role: Datatype.STRING
    },
    {
      timestamps: false
    }
  );

  return user;
};
