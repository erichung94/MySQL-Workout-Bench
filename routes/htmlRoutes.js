var db = require("../models");
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    // Load index/landing/create profile page
    app.get("/", function(req, res) {
    // If the user already has an account send them to their profile page
        if (req.user) {
            res.redirect("/profile");
        }
        res.render("signup", {
            title: "Sign Up",
            customcss: "<link rel=\"stylesheet\" href=\"/styles/styles.css\"></link>",
            customjs: "<script type=\"text/javascript\" src=\"/js/signup.js\"></script>\n<script type=\"text/javascript\" src=\"/js/index.js\"></script>"
        });
    });

    app.get("/login", function(req, res) {
    // If the user already has an account send them to their profile page
        if (req.user) {
            res.redirect("/profile");
        }
        res.render("login", {
            title: "Log In",
            customcss: "<link rel=\"stylesheet\" href=\"/styles/styles.css\"></link>",
            customjs: "<script type=\"text/javascript\" src=\"/js/login.js\"></script>"
        });
    });

    // Here we've added our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/profile", isAuthenticated, function(req, res) {
        res.render("profile", {
            title: "Profile",
            customcss: "<link rel=\"stylesheet\" href=\"/styles/profile.css\"></link>",
            customjs: "<script type=\"text/javascript\" src=\"/js/profile.js\"></script>"
        });
    });

    // User can pick their workouts
    app.get("/activities", isAuthenticated, function(req, res) {
        res.render("activities", {
            title: "Workout Options",
            customcss: "<link rel=\"stylesheet\" href=\"/styles/activities.css\"></link>\n<link rel=\"stylesheet\" href=\"/styles/profile.css\"></link>",
            customjs: "<script type=\"text/javascript\" src=\"/js/activities.js\"></script>"
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};