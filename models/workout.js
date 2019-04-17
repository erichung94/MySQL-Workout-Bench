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

    // We're saying that a Workout should belong to an User
    Workout.associate = function(models) {
        // A Workout can't be created without an  due to the foreign key constraint
        models.Workout.belongsToMany(models.User, {
            through: models.UserWorkout 
        });
    };    
    return Workout;
};