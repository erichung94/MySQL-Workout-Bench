"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("UserWorkout", {
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            workoutId: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable("UserWorkout");
    }
};