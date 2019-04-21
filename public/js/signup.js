$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");

    // When the signup button is clicked, we validate the email and password are not blank
    // Create new profile page, does not redirect to current user page
    signUpForm.on("submit", function(event) {
        var firstNameInput = $("input#inputFirstName");
        var lastNameInput = $("input#inputLastName");
        var genderInput = $("#inputGender").val();
        var emailInput = $("input#email-input");
        var passwordInput = $("input#password-input");
        var locationInput = $("#inputLocation").val();

        console.log("submitted");
        event.preventDefault();
        var userData = {
            firstName: firstNameInput.val().trim(),
            lastName: lastNameInput.val().trim(),
            gender: genderInput,
            localLocation: locationInput,
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
        // If we have all the fields, run the signUpUser function
        signUpUser(userData.firstName, userData.lastName, userData.email, userData.gender, userData.localLocation, userData.password);
        firstNameInput.val("");
        lastNameInput.val("");
        emailInput.val("");
        passwordInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the profile page
    // Otherwise we log any errors
    function signUpUser(firstName, lastName, email, gender, localLocation, password) {
        $.post("/api/signup", {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            localLocation: localLocation,
            email: email,
            password: password
        }).then(function(data) {
            window.location.replace(data);
            // If there's an error, handle it by throwing up a bootstrap alert
        }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});
