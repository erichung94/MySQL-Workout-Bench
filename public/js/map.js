function initialize() {
    var input = document.getElementById("inputLocation");
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, "place_changed", function () {
        var place = autocomplete.getPlace();
        document.getElementById("gym").value = place.name;
        document.getElementById("lat").value = place.geometry.location.lat();
        document.getElementById("lng").value = place.geometry.location.lng();
    });
}
google.maps.event.addDomListener(window, "load", initialize);