"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Classes", "type", Sequelize.STRING, {
      references: {
        model: {
          tableName: "Types",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn(
      "Classes",
      "isAvailable",
      Sequelize.BOOLEAN,
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Classes", "type");
    await queryInterface.removeColumn("Classes", "isAvailable");
  },
};
