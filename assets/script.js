//OpenWeatherMap API key
let APIKey = "1349b8658e08989cac6393f5e9d7b731";
let city;
let newDiv = $("<div>");
let searches = [];
let latitude;
let longitude;
let icon;

displayRecentSearches()

function displayForecast() {
// OpenWeatherMap URL
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
let queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
let queryURLUV;

// OpenWeatherMap AJAX call for class results  
$(document).ready(function() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(weather) {
        //Empty previous city's contents
        $(".clear").empty();
        //Unhide results div
        $("div").removeClass("hide");

        //Retrieve and append the data for current day's forecast
        let city = $(".results-city").text(weather.name + " ");
        let icon = $(".results-icon").append($('<img/>').attr('src', "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"));
        let temp = $(".results-temp").append("Temp: " + weather.main.temp + " *F");
        let humidity = $(".results-humidity").append("Humidity: " + weather.main.humidity + "%");
        let wind = $(".results-wind").append("Wind Speed: "+ weather.wind.speed + " miles/hour");
        latitude = weather.coord.lat;
        longitude = weather.coord.lon; 

        //Query URL for UVInfo
        queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";

        console.log("Current Weather: " + weather);


    // UV ajax call  
    }).then(function() {
        $.ajax({
            url: queryURLUV,
            method: "GET"
        }).then(function(UVInfo) {
            //takes the latitude & longitude data from weather to find UV data in UVInfo
            let uvIndex = $(".results-uv").append("UV Index: " + UVInfo.value);
            let date = UVInfo.date_iso.split("T")[0];
            let currentDate = $(".results-date").text("(" + date + ") ");

        console.log("UV: " + UVInfo);
        })

})
    //5 day forecast ajax call
    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function(forecast5Day) {
        //Empty previous data for the 5 day forecast
        $(".results-cards").empty();

        let day = []
        
        //Creates the 5 day forecast cards 7 populates the forecast for each day.
        for (i=6; i < 40; i+= 8){
            let newCard = $("<div>");
            newCard.addClass("card text-white bg-primary");
            $(".results-cards").append(newCard);

            let newCardBody = newCard.append("<div>");
            newCardBody.addClass("card-body");

            let newDiv = $("<div>");
            newDiv.addClass("forecast5Day");
            newDiv.attr("data-name", day[i]);

            let date = newDiv.append(forecast5Day.list[i].dt_txt.split(" ")[0]);
            date.text(day[i]);
            newCardBody.append(date);

            let icon = "http://openweathermap.org/img/wn/" + forecast5Day.list[i].weather[0].icon + "@2x.png";
            newDiv.append($('<img/>').attr('src', icon));

            let temp = JSON.stringify(forecast5Day.list[i].main.temp);
            newDiv.append($("<div>").text("Temp: " + temp + " *F"));

            let humidity = JSON.stringify(forecast5Day.list[i].main.humidity);
            newDiv.append($("<div>").text("Humidity: " + humidity + "%"));
            
        }
        
       console.log("5 Day Forecast: " + forecast5Day);
    })
});
}

function renderButtons() {
    // Deletes the buttons to recent searches prior to adding the newest search
    $("#recent-search").empty();
    // Loops through the array of searches
    for (let i = 0; i < searches.length; i++) {

      // Then dynamicaly generates buttons for each search in the array
      let a = $("<button>");
      // Adds a class of searched to our button
      a.addClass("recently-searched");
      // Added a data-attribute
      a.attr("data-name", searches[i]);
      // Provided the initial button text
      a.text(searches[i]);
      // Added the button to the recent-search div
      $("#recent-search").append(a);
    }
  }

//Get stored searches from localStorage
function displayRecentSearches() {

    // Parsing the JSON string to an object
    var storedSearches = JSON.parse(localStorage.getItem("searches"));

    // If searches were retrieved from localStorage, update the searches array to it
    if (storedSearches !== null) {
        searches = storedSearches;
    }

    // Render todos to the DOM
    renderButtons();
}

//Clear local storage
$("#clear-history").on("click", function(event) {
    //Prevents the page from loading another page
    event.preventDefault();
    localStorage.clear();
    $("#recent-search").empty();
    searches = [];

})
  

//Click event when search btn is clicked to search for city entered
$("#search-btn").on("click", function(event) {
    //Prevents the page from loading another page
    event.preventDefault();
    // This line of code will grab the input from the textbox
    city = $("#city-input").val().trim();
    // The city from the textbox is then added to our array
    searches.push(city);
    // Calling renderButtons which handles the processing of our searches array
    renderButtons();
    //Calling displayForecast which will show the current and 5 day forecasts
    displayForecast();

    localStorage.setItem("searches", JSON.stringify(searches));
    
  });

//Adding click event to searched city buttons
$(".recently-searched").on("click", function(event) {
    city = $(this).attr("data-name");
    displayForecast();
    
})


//In the array for each day, find the highest temp & humidity for each
            //After speaking to TA for class, this may be too difficult of code for this project
            //Commenting out for use at a different time. 
            //To be used with function(forecast5Day)
            //Was having trouble calling the function a second time
            
        /* 
            let tempArr = [];
            let forecastTemp;
            let humidityArr = [];
            let forecastHumidity;
            
            function high(start, end) { 
                for (let i = start ; i <= end; i++) {
                    let hourlytemp = forecast5Day.list[i].main.temp;
                    let pushTemp = tempArr.push(hourlytemp);
                    let hourlyHumidity = forecast5Day.list[i].main.humidity;
                    let pushHumid = humidityArr.push(hourlyHumidity);
                }
                forecastTemp = Math.max.apply(Math, tempArr);
                forecastHumidity = Math.max.apply(Math, humidityArr);

                console.log("high: " + forecastTemp);
                console.log("humid: " + forecastHumidity);
            }
            
            //Call function high for day 1
            high(0, 7);
            
                    let addTemp1 = day1.append($("<p>").text("High: " + forecastTemp + " *F"));
            let addHumidity1 = day1.append($("<p>").text("Humidity: " + forecastHumidity + "%"));
            */