var db = require("../models");
var passport = require("../config/passport");
var Op = require("sequelize").Op;

module.exports = function(app) {

    // *****************************************************************************
    // USER AUTHENTICATION SECTION
    //
    // ******************************************************************************

    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        // The redirect will happen on the front end
        res.json("/profile");
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely
    // If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function(req, res) {
        console.log("YOU ARE HEREEEEEE");
        console.log(req.body);
        function findGender(gender) {
            var picURL;
            if (gender === "Male") {
                picURL = "/images/maleDefault.jpg";
                return picURL;
            } else if (gender === "Female") {
                picURL = "/images/femaleDefault.jpg";
                return picURL;
            }
        }
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            email: req.body.email,
            picture: findGender(req.body.gender),
            password: req.body.password
        }).then(function() {
            res.redirect(307, "/api/login");
        }).catch(function(err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
        });
    });



    // Route for grabbing user workout data.
    app.post("/api/activity", function(req, res) {
        console.log("Activity Logged!");
        db.Workout.findOne({
            where: {activity: req.body.activity, time: req.body.time}
        }).then(function(c){
            // allows users to pick the same activity and populate UserWorkout model
            if(c === null){
                db.Workout.create({
                    activity: req.body.activity,
                    time: req.body.time
                }).then(function(v){ 
                    db.UserWorkout.create({
                        WorkoutId: v.dataValues.id,
                        UserId: req.user.id
                    });
                }).then(function() {
                    res.status(200).json({url:"/profile"});
                }).catch(function(err) {
                    console.log(err);
                    res.json({url:"/profile"});
                });
            } else {
                db.UserWorkout.create({
                    WorkoutId: c.id,
                    UserId: req.user.id
                }).then(function() {
                    res.status(200).json({url:"/profile"});
                }).catch(function(err) {
                    console.log(err);
                    res.json({url:"/profile"});
                });
            }
        });
    });

    // Route for logging user out
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        }
        else {
            db.User.findOne({where : {id: req.user.id}}).then(function(dbResult){
                res.json(dbResult);
            });
        }
    });

    // Route for getting some data about our user workout data to be used client side
    app.get("/api/workout_data", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        }
        else {
            // Otherwise send back the user's info excluding the password
            db.Workout.findAll({}).then(function(dbWorkout) {
                res.json(dbWorkout);
            });
        }
    });


    // LOGIC FOR MATCHING ///
    //Query to find all workouts the current user has
    app.get("/api/match", (req, res) => {
        db.UserWorkout.findAll({
            where: {userId: req.user.id}
        }).then(function(findUser) {
            console.log("This is the workout for this current user ", findUser.map(userData => userData.dataValues.WorkoutId));
            db.User.findAll({  
                include: [
                    { model: db.Workout, where: {
                        [Op.or]: findUser.map(workoutData => {
                            var obj = {id: workoutData.dataValues.WorkoutId};
                            return obj;
                        })
                    }}, 
                ]
            }).then(results => {
                var mappedResults = results.map(matchData => {
                    var matchedUser = matchData.dataValues;
                    var resultsObj = {
                        picture: matchedUser.picture,
                        firstName: matchedUser.firstName,
                        gender: matchedUser.gender,
                        workouts: matchedUser.Workouts.map(matchedActivity => ({ 
                            activity: matchedActivity.activity,
                            time: matchedActivity.time,
                        }))
                    };
                    return resultsObj;
                });
                console.log(mappedResults)
                res.json(mappedResults);
            });
        });
    });
};
