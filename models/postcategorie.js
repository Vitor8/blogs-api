const PostCategorie = (sequelize, _DataTypes) => {
  const newPostCategorie = sequelize.define('PostCategorie',
    {}, { tableName: 'PostsCategories', timestamps: false });

  newPostCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: newPostCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: newPostCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return newPostCategorie;
};

module.exports = PostCategorie;