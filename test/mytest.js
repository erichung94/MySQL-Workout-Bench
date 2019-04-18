const db = require("../models");
db.sequelize.sync({force:true}).then(function(){
    db.User.findAll({
        include: [
            { model: db.Workout, where: { activity: "cardio", time: "evening" } }
        ]
    }).then(function(res){
      console.log(res)
    });
//     .then(results => results.map(v => console.log(v.Workouts.map(c => c.dataValues.activity), v.dataValues.id)));

});