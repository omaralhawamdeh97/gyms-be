const { SequelizeSlugify } = require("sequelize-slugify/lib/sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Gym = sequelize.define("Gym", {
    name: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
    },
    slug: { type: DataTypes.STRING, unique: true },
  });
  SequelizeSlugify.slugifyModel(Gym, { source: ["name"] });
  Gym.associate = (models) => {
    models.User.hasMany(Gym, { foreignKey: "userId", as: "gyms" });
    Gym.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Gym;
};
