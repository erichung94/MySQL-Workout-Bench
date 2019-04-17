var db = require("../models");

  module.exports = function(sequelize, DataTypes) {
     var NewUser= sequelize.define("NewUser", {
       name: DataTypes.STRING,
     });
     return NewUser;
   };
   

   module.exports = function(app) {
   db.NewUser.findAll({
     where: {
          "workout": "cardio",
        }
   }).then(function (result) { });
}