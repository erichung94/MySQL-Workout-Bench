var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
    // *****************************************************************************
    // USER AUTHENTICATION SECTION
    //
    // ******************************************************************************

    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        console.log("helloooooo");
        console.log(req.body);
        // The redirect will happen on the front end
        res.json("/profile");
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely
    // If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function(req, res) {
        console.log("YOU ARE HEREEEEEE");
        console.log(req.body);
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }).then(function() {
            res.redirect(307, "/api/login");
        }).catch(function(err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
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
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.user.email,
                id: req.user.id
            });
        }
    });
};

