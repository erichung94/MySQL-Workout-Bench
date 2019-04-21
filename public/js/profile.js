$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
        $(".member-firstname").text(data.firstName);
        $(".member-lastname").text(data.lastName);
        $(".member-email").text(data.email);
        $(".member-gender").text(data.gender);
        $("#profilePicture").attr("src", data.picture);
    });


    matchUsers();

    $("#pictureChange").click(function () {
        $("#picModal").modal();
    });

    $("#savePic").click(function() {
        var newPic = $("input#photo").val();
        console.log("submitted new pic!");
        
        updatePhoto(newPic);
    });

    // Update picture URL, close modal when done
    function updatePhoto(pic) {
        $.ajax({
            method: "PATCH",
            url: "/api/signup",
            data: {
                picture: pic}
        }).then(function(data) {
            window.location.replace(data);
            $("#picModal").modal("hide");
            location.reload();
            // If there's an error, handle it by throwing up a bootstrap alert
        }).catch(handleLoginErr);
    }


    function matchUsers() {
        $.get("/api/match").then(data => console.log(data));
    }


    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});
