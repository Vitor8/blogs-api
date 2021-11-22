const User = (sequelize, DataTypes) => {
  const newUser = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Users',
    underscored: false,
  });

  newUser.associate = (models) => {
    newUser.hasMany(models.BlogPost,
      { foreignKey: 'userId', as: 'blogposts' });
  };

  return newUser;
};

module.exports = User;