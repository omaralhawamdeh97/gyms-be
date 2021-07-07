"use strict";
const { SequelizeSlugify } = require("sequelize-slugify/lib/sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define("Type", {
    name: {
      type: DataTypes.STRING,
    },
    slug: { type: DataTypes.STRING, unique: true },
  });
  SequelizeSlugify.slugifyModel(Type, { source: ["name"] });

  Type.associate = (models) => {
    models.Class.hasMany(Type, { foreignKey: "classId" });
    Type.belongsTo(models.Class, { foreignKey: "classId" });
  };

  return Type;
};
