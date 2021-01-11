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
    //fill the list of all the city serached  by the user
    function fillList() {
        var city = $("#searchCity").val();
        var list = $(".list-group");
        if (localStorage.getItem("city_name")) {

            localStorage.setItem("city_name", city);
        }
        else {
            localStorage.setItem("city_name", city);
        }
        var li = "<a href='#' class='list-group-item'>" + city + "</a>";
        list.append(li);
    }
    //when user click on the city from the list
    $('.list-group').on('click', function (event) {
        var get = event.target.innerText;
        console.log("get", get);
        inputVal = get;
        fillCityInfo();
    });

    //fill the current weather info for the serached city
    function fillCityInfo() {
        //api key
        const apiKey = "8885e952b1990b5bf855eb797f5fe06b";
        //url path for the open weather api
        const pathurl = "https://api.openweathermap.org/data/2.5/weather?q=" + inputVal + "&appid=" + apiKey + "&units=metric";
        //ajax call
        $.ajax({
            url: pathurl,
            type: "GET",
            dataType: "json",
            success: function (result) {
                checkCityAlreadyExist();
                $("#city_name").empty();
                $("#displayInfo").empty();
                $(".card-deck").empty();
                var d = new Date();
                var strDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
                const icon = "https://openweathermap.org/img/wn/" + result.weather[0]["icon"] + "@2x.png";
                var getInfo = "<h3>" + result.name + " (" + strDate + ")<img src=" + icon + " style='display:inline;width:40px;' class='img-responsive'></h3>";
                $("#city_name").append(getInfo);

                const temp = document.createElement("li");
                temp.innerHTML = "Temprature: " + ((((((result.main.temp))) * 9) / 5) + 32).toFixed(2) + String.fromCharCode(176) + "F";
                const humidity = document.createElement("li");
                humidity.innerHTML = "Humidity: " + result.main.humidity + "%";
                const windSpeed = document.createElement("li");
                windSpeed.innerHTML = "Wind Speed: " + result.wind.speed.toFixed(1) + " MPH";
                const UVindex = document.createElement("li");
                var lat = result.coord.lat;
                var lon = result.coord.lon;
                var uv = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
                //ajax call to get the uv index for the current city
                $.ajax({
                    url: uv,
                    method: "GET",
                }).then(function (res) {
                    var uvI = res.value;
                    //check the uv index and change the color for normal moderate and high
                    if (uvI >= 0 && uvI <= 2.9) {
                        UVindex.innerHTML = "UV Index: <mark style='background-color:green'>" + uvI + "</mark>";
                    }
                    else if (uvI >= 3 && uvI <= 5.9) {
                        UVindex.innerHTML = "UV Index: <mark style='background-color:yellow'>" + uvI + "</mark>";
                    } 
                    else if (uvI >= 6 && uvI <=7.9) {
                        UVindex.innerHTML = "UV Index: <mark style='background-color:orange'>" + uvI + "</mark>";
                    }
                    else if (uvI >= 8 && uvI <=10.9) {
                        UVindex.innerHTML = "UV Index: <mark style='background-color:red'>" + uvI + "</mark>";
                    }
                    else if (uvI >=11) {
                        UVindex.innerHTML = "UV Index: <mark style='background-color:violet'>" + uvI + "</mark>";
                    }
                });
                $("#displayInfo").append(temp);
                $("#displayInfo").append(humidity);
                $("#displayInfo").append(windSpeed);
                $("#displayInfo").append(UVindex);
                $("#border").addClass("border");
                fillFiveDayData();

            },
            error: function (result) {
                //if the user enter the wrong city name alert the user
                $(".alertInfo").addClass("alert");
                $(".alertInfo").addClass("alert-info");
                $(".alertInfo").text("Enter the correct city..");
                $("#searchCity").val("");
            }
        });

    }
//fill the 5 day broadcast for current city
function fillFiveDayData() {
    //set the api
    const apiKey = "8885e952b1990b5bf855eb797f5fe06b";
    //set the path
    const pathurl = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputVal + "&appid=" + apiKey+"&units=metric";
    //make an ajax call
    $.ajax({
        url: pathurl,
        type: "GET",
        dataType: "json",
        success: function (result) {
            $("#show").removeClass("disapper");
            $("#show").addClass("show");;
            var count = 0;
            if (count != 5) {
                for (var i = 0; i < result.list.length; i++) {
                    var date = result.list[i].dt_txt;
                    var checkDate = new Date(date);
                    if (checkDate.getHours() == 6) {
                        // console.log(checkDate);
                        var displayDate = (checkDate.getMonth() + 1) + "/" + checkDate.getDate() + "/" + checkDate.getFullYear();
                        const icon = "https://openweathermap.org/img/wn/" + result.list[i].weather[0]["icon"] + "@2x.png";
                        const temp = "Temprature: " + ((((((result.list[i].main.temp))) * 9) / 5) + 32).toFixed(2) + String.fromCharCode(176) + "F";
                        const humidity = "Humidity: " + result.list[i].main.humidity + "%";
                        count++;
                        var data = "<div class='col-lg-2'><div class='card bg-primary'><div class='card-body text-center'><p class='card-text'>" + displayDate + "</p><img src=" + icon + " /><p class='card-text'>" + temp + "</p><p class='card-text'>" + humidity + "</p></div></div>";
                        $(".card-deck").append(data);
                    }
                }
            }
            $("#searchCity").val('');
        },
        error: function (result) {
        }
    });
}
});