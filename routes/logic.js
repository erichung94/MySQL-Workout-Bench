const db = require("../models");

module.exports = function(app) {
///// LOGIC FOR MATCHING ////
db.User.findAll({
     include: [
         { model: db.Workout, where: { activity: "cardio", time: "evening" } }
     ]
 }).then(results => results.map(v => console.log(v.Workouts.map(c => c.dataValues.activity), v.dataValues.id)));

}