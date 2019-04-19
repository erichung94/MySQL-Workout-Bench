$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
        $(".member-firstname").text(data.firstName);
        $(".member-lastname").text(data.lastName);
        $(".member-email").text(data.email);
        $(".member-gender").text(data.gender);
        $("#profilePicture").attr("src",data.picture);
    });
});
