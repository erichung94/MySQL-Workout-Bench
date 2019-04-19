module.exports = function(sequelize, DataTypes) {

    var Workout = sequelize.define("Workout", {
        activity: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        time: { 
            type: DataTypes.STRING,
            allowNull: true
        },
        location: { 
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    // Linking tables    
    Workout.associate = function(models) {
        models.Workout.belongsToMany(models.User, {
            through: models.UserWorkout 
        });
    };    
    return Workout;
};