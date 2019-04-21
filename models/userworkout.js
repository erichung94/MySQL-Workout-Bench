module.exports = function(sequelize, DataTypes) {

    // Creating joined table which holds UserID and WorkoutID
    var UserWorkout = sequelize.define("UserWorkout", {
    });
 
    // Table that links User and Workout
    UserWorkout.associate = function(models) {
        models.UserWorkout.belongsTo(models.User);
        models.UserWorkout.belongsTo(models.Workout);
    };    
    return UserWorkout;
};