module.exports = function(sequelize, DataTypes) {

    var Workout = sequelize.define("Workout", {
        type: DataTypes.STRING,
        allowNull: false,
    });

    // We're saying that a Workout should belong to an User
    Workout.associate = function(models) {
        // A Workout can't be created without an  due to the foreign key constraint
        Workout.belongsToMany(models.User, {
            through: "UserWorkout" });
    };    
    return Workout;
};