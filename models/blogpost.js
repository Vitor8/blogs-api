const BlogPost = (sequelize, DataTypes) => {
  const newBlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
    underscored: false,
  });

  newBlogPost.associate = (models) => {
    newBlogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'users' });
  };

  return newBlogPost;
};

module.exports = BlogPost;