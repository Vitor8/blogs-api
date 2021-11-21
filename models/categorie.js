const Categorie = (sequelize, DataTypes) => {
  const newCategorie = sequelize.define('Categorie', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Categories',
    underscored: false,
  });

  return newCategorie;
};

module.exports = Categorie;