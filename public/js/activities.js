$(document).ready(function() {
    // CSS Portion
    var prevId;

    // console.log(match());

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
    var workoutForm = $("form.workout");
    
    workoutForm.on("submit", function() {
        event.preventDefault();
        var timeInput = $("#workoutTime").val();
        // alert(timeInput+" "+activity);
        var workoutData = {
            activity: activity,
            time: timeInput,
        };
        console.log(workoutData);
        // write a POST request to some route (e.g. "/api/saveActivity")
        updateWorkout(workoutData.activity,workoutData.time);
        
    });

    // Does a post to the signup route. If successful, we are redirected to the profile page
    // Otherwise we log any errors
    function updateWorkout(activity,time) {
        console.log(activity + time);
        $.post("/api/activity", {
            activity: activity,
            time: time
        }).then(function(data) {
            // Then, in the callback, type window.location.replace("/profile")
            window.location.replace(data.url);
            // If there's an error, handle it by throwing up a bootstrap alert
        }).catch(handleInputErr);
    }

    //this function is for testing
    // function match() {
    //     $.get("/api/match").then(function(data) { console.log("BIG JUICY DATA: ", data); });
    // }

    function handleInputErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
    
});


