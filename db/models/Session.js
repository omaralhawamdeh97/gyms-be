"use strict";
const { SequelizeSlugify } = require("sequelize-slugify/lib/sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("Session", {
    name: {
      type: DataTypes.STRING,
    },
    capacity: { type: DataTypes.STRING },
    bookedSlots: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING, unique: true },
  });
  SequelizeSlugify.slugifyModel(Session, { source: ["name"] });

  Session.associate = (models) => {
    models.Class.hasMany(Session, { foreignKey: "classId" });
    Session.belongsTo(models.Class, { foreignKey: "classId" });
  };
  Session.associate = (models) => {
    models.User.hasMany(Session, { foreignKey: "userId" });
    Session.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Session;
};
