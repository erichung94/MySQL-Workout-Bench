module.exports = function(sequelize, DataTypes) {

    var UserWorkout = sequelize.define("UserWorkout", {

    });
 
    // Table that links User and Workout
    UserWorkout.associate = function(models) {
        models.UserWorkout.belongsTo(models.User);
        models.UserWorkout.belongsTo(models.Workout);
    };    
    return UserWorkout;
};