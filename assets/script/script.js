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
     //fill from localstorage the city last searched
     function fillFromLocalStorage() {
        //check if localstorage for the city is empty or not
        if (localStorage.getItem("city_name")) {
            var city = localStorage.getItem("city_name");
            $("#searchCity").val(city);
            inputVal = city;
            //fill the city info
            fillCityInfo();
            }
    }
    //check if the city name is already present in the city list if it's present do not make entry
    function checkCityAlreadyExist() {
        var getList = $(".list-group a");
        var check = true;
        if (getList.length > 0) {
            for (var i = 0; i < getList.length; i++) {
                if (inputVal == getList[i].innerHTML) {
                    check = false;
                    break;
                }
            }
            if (check) {
                fillList();
            }
        }
        else {
            fillList();
        }


    }
});