"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Workout", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            time: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable("Workout");
    }
};