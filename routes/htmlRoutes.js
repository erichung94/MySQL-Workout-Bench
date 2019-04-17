// var db = require("../models");
// var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
<<<<<<< HEAD
  // Load index/landing/create profile page
  app.get("/", function(req, res) {
    // If the user already has an account send them to their profile page
    if (req.user) {
      res.redirect("/profile");
    }
    res.render("signup", {
      title: "Sign Up",
      customcss: `<link rel="stylesheet" href="/styles/styles.css"></link>`,
      customjs: `<script type="text/javascript" src="/js/signup.js"></script>\n<script type="text/javascript" src="/js/index.js"></script>`
=======
    // Load index page
    app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        // res.sendFile(path.join(__dirname, "../public/signup.html"));
        res.render("signup", {
            title: "Sign Up",
            customcss: "<link rel=\"stylesheet\" href=\"/styles/styles.css\"></link>",
            customjs: "<script type=\"text/javascript\" src=\"/js/signup.js\"></script>\n<script type=\"text/javascript\" src=\"/js/index.js\"></script>"
        });
>>>>>>> master
    });

<<<<<<< HEAD
  app.get("/login", function(req, res) {
    // If the user already has an account send them to their profile page
    if (req.user) {
      res.redirect("/profile");
    }
    res.render("login", {
      title: "Log In",
      customcss: `<link rel="stylesheet" href="/styles/styles.css"></link>`,
      customjs: `<script type="text/javascript" src="/js/login.js"></script>`
=======
    app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        // res.sendFile(path.join(__dirname, "../public/login.html"));
        res.render("login", {
            title: "Log In",
            customcss: "<link rel=\"stylesheet\" href=\"/styles/styles.css\"></link>",
            customjs: "<script type=\"text/javascript\" src=\"/js/login.js\"></script>\n<script type=\"text/javascript\" src=\"/js/index.js\"></script>"
        });
>>>>>>> master
    });

<<<<<<< HEAD
  // Here we've added our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/profile", isAuthenticated, function(req, res) {
    res.render("profile", {
      title: "Log In",
      customcss: `<link rel="stylesheet" href="/styles/styles.css"></link>`,
      customjs: `<script type="text/javascript" src="/js/profile.js"></script>`
=======
    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, function(req, res) {
        res.render("members", {
            title: "Log In",
            customcss: "<link rel=\"stylesheet\" href=\"/styles/styles.css\"></link>",
            customjs: "<script type=\"text/javascript\" src=\"/js/members.js\"></script>\n<script type=\"text/javascript\" src=\"/js/index.js\"></script>"
        });
>>>>>>> master
    });
  
    // app.get("/", function(req, res) {
    //   db.Example.findAll({}).then(function(dbExamples) {
    //     res.render("index", {
    //       msg: "Welcome!",
    //       examples: dbExamples
    //     });
    //   });
    // });

    // // Load example page and pass in an example by id
    // app.get("/example/:id", function(req, res) {
    //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
    //     res.render("example", {
    //       example: dbExample
    //     });
    //   });
    // });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};
