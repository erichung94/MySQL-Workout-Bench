$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var firstNameInput = $("input#inputFirstName");
    var lastNameInput = $("input#inputLastName");
    // var genderInput = $("#inputGender option:selected").val();
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    // When the signup button is clicked, we validate the email and password are not blank
    // Create new profile page, does not redirect to current user page
    signUpForm.on("submit", function(event) {
        console.log("submitted");
        // alert(genderInput);
        event.preventDefault();
        var userData = {
            firstName: firstNameInput.val().trim(),
            lastName: lastNameInput.val().trim(),
            // gender: genderInput,
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
        // If we have all the fields, run the signUpUser function
        signUpUser(userData.firstName, userData.lastName, userData.email, userData.password);
        firstNameInput.val("");
        lastNameInput.val("");
        emailInput.val("");
        passwordInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the profile page
    // Otherwise we log any errors
    function signUpUser(firstName, lastName, email, password) {
        $.post("/api/signup", {
            firstName: firstName,
            lastName: lastName,
            // gender: gender,
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
