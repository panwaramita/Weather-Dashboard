//function after the page load
$(document).ready(function () {
    //set the input value to null
    var inputVal = "";
    //function to fill the city last searched from the localstorage
    fillFromLocalStorage();
//once user submit the form
    $("form").on("submit", function (e) {
        e.preventDefault();
        //get the city name
        inputVal = $("#searchCity").val();
        //check if the city name is enterd or not
        if (inputVal == "" || inputVal == " ") {
            $("#searchCity").val(" ");
            $(".alertInfo").addClass("alert");
            $(".alertInfo").addClass("alert-info");
            $(".alertInfo").text("Enter the city..");
        }
        else {

            $(".alertInfo").text(" ");
            $(".alertInfo").removeClass("alert");
            $(".alertInfo").removeClass("alert-info");
            //fill the city list
            fillCityInfo();

        }
    });
});