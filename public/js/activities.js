$(document).ready(function() {
    // CSS Portion
    var prevId;

    $(".activity-square").on("click", function() {
        $(this).css({
            "background-color": "#33CCFF",
            "transition-duration" : ".5s",
            "transition-property" : "background-color"
        });
        $(this).find("img").attr("src", "images/activityIcons/" + $(this).attr("id") + "-white.png");
        $(this).find("p").css({
            "color" : "white",
        });

        if (prevId) {
            $("#" + prevId).css({
                "background-color" : "white"
            });
            $("#" + prevId + " > img").attr("src", "images/activityIcons/" + prevId + ".png");
            $("#" + prevId + " > p").css({
                "color" : "#242B33"
            });
        }

        prevId = $(this).attr("id");
    });

    // Grabbing value of chosen activity
    var activity;

    $(".activity-square").click(function() {
        activity = ($(this).attr("data-value"));
    });
    
    // Grab value from forms (location & time)
    // var workoutForm = $("form.workout");
    // workoutForm.on("submit", function() {
    var submitButton = $("#activitiesSubmitButton");

    submitButton.on("click", function() {
        event.preventDefault();
        var timeInput = $("#workoutTime").val();
        // alert(timeInput+" "+activity);
        var workoutData = {
            activity: activity,
            time: timeInput,
        };
        // write a POST request to some route (e.g. "/api/workout_data")
        updateWorkoutAndMatchUsers(workoutData.activity,workoutData.time);
        
    });

    // Does a post to the signup route. If successful, we are redirected to the profile page
    // Otherwise we log any errors
    function updateWorkoutAndMatchUsers(activity,time) {
        console.log(activity + time);
        console.log("dis working?");
        $.post("/api/activity", {
            activity: activity,
            time: time
        }).then(() =>
        // instead of the console.log, you can populate the handlebar or html from here
            $.get("/api/match").then(data => console.log(data))
        )
        // If there's an error, handle it by throwing up a bootstrap alert
            .catch(handleInputErr);
    }

    function handleInputErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});


