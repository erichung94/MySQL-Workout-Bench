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
            $.get("/api/match").then(function(data) { 
                matches = data.matchedUsers;
                if (matches === []) {
                    alert("I'm sorry. It looks like no one is available at the chosen time to do this activity. Please try again at a later time.");
                } else {
                    for (var i = 0; i < matches.length; i++) {
                        // console.log(data[i]);
                        buildCard(matches[i]);
                    }
                }
            })
        )
        // If there's an error, handle it by throwing up a bootstrap alert
            .catch(handleInputErr);
    }

    function buildCard(object) {
        console.log(object);
        $("#match-content").append(
            `<div class="row p-3">
                <div class="col-1"></div>
                <div class="col-10 m-2" id="matchCard">
                    <div class="row p-2">
                    <div class="col-12 mt-3 text-center">
                        <img src="${object.picture}" class="img-fluid rounded-circle mb-3" alt="" id="profilePicture">
                        <p class="h4 mb-1" id="profileName">${object.firstName}</p>
                    </div>
                    </div>
                    <!-- Email Row -->
                    <div class="row p-1 profileRow">
                    <div class="col-6 d-flex justify-content-start align-items-center">
                        <p class="profileInformation h5">Email</p>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <p class="profileInformationContent">${object.email}</p>
                    </div>
                    </div>
                    <!-- Gender Row -->
                    <div class="row p-1">
                    <div class="col-6 d-flex justify-content-start align-items-center">
                        <p class="profileInformation h5">Gender</p>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <p class="profileInformationContent">${object.gender}</p>
                    </div>
                    </div>
                    <!-- Time Row -->
                    <div class="row p-1 profileRow">
                    <div class="col-6 d-flex justify-content-start align-items-center">
                        <p class="profileInformation h5">Activity</p>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <p class="profileInformationContent">${object.workouts[0].activity}</p>
                    </div>
                    </div>

                    <!-- Time Row -->
                    <div class="row p-1">
                    <div class="col-6 d-flex justify-content-start align-items-center">
                        <p class="profileInformation h5">Time</p>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <p class="profileInformationContent">${object.workouts[0].time}</p>
                    </div>
                    </div>
                    <div class="row">
                    <button type="button" class="btn btn-block btn-large btn-success">Pick as Partner</button>
                    </div>
                </div>
                <div class="col-1"></div>
            </div>`
        );
    }

    function handleInputErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});


