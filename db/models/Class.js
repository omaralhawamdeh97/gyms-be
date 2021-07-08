"use strict";
const { SequelizeSlugify } = require("sequelize-slugify/lib/sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define("Class", {
    name: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    date: { type: DataTypes.DATEONLY },
    slug: { type: DataTypes.STRING, unique: true },
    isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
    type: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Class, { source: ["name"] });

  Class.associate = (models) => {
    models.Gym.hasMany(Class, { foreignKey: "gymId" });
    Class.belongsTo(models.Gym, { foreignKey: "gymId" });
  };

  return Class;
};
