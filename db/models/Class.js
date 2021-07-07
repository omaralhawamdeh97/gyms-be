"use strict";
const { SequelizeSlugify } = require("sequelize-slugify/lib/sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define("Class", {
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE },
    slug: { type: DataTypes.STRING, unique: true },
    isAvailable: { type: DataTypes.BOOLEAN },
    type: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Class, { source: ["name"] });

  Class.associate = (models) => {
    models.Gym.hasMany(Class, { foreignKey: "gymId" });
    Class.belongsTo(models.Gym, { foreignKey: "gymId" });
  };

  return Class;
};
