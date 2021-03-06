"use strict";
const { SequelizeSlugify } = require("sequelize-slugify/lib/sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("Session", {
    name: {
      type: DataTypes.STRING,
    },
    capacity: { type: DataTypes.INTEGER },
    classId: { type: DataTypes.INTEGER },
    // couchId: { type: DataTypes.INTEGER },
    bookedSlots: { type: DataTypes.INTEGER },
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
  Session.associate = (models) => {
    models.User.hasMany(Session, { foreignKey: "coachId" });
    Session.belongsTo(models.User, { foreignKey: "coachId" });
  };
  return Session;
};
