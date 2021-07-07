"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Classes", "types", Sequelize.STRING, {
      references: {
        model: {
          tableName: "Types",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn(
      "Classes",
      "isAvailabe",
      Sequelize.BOOLEAN,
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Classes", "types");
    await queryInterface.removeColumn("Classes", "isAvailabe");
  },
};
