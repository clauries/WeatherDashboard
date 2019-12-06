//OpenWeatherMap API key
let APIKey = "1349b8658e08989cac6393f5e9d7b731";
let city
let newDiv = $("<div>");
let searches = [];
let latitude;
let longitude;
let icon;

function displayForecast() {
// OpenWeatherMap URL
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
let queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
let queryURLUV;
let queryIcons;

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
        //let icon = $(".results-icon").append(weather.weather[0].icon);
        let temp = $(".results-temp").append("Temp: " + weather.main.temp + " *F");
        let humidity = $(".results-humidity").append("Humidity: " + weather.main.humidity + "%");
        let wind = $(".results-wind").append("Wind Speed: "+ weather.wind.speed + " miles/hour");
        latitude = weather.coord.lat;
        longitude = weather.coord.lon; 
        icon = weather.weather[0].icon;
        
        queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";
        queryURLIcons = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    // UV ajax call  
    }).then(function() {
        $.ajax({
            url: queryURLUV,
            method: "GET"
        }).then(function(UVInfo) {
            let uvIndex = $(".results-uv").append("UV Index: " + UVInfo.value);
            let date = UVInfo.date_iso.split("T")[0];
            let currentDate = $(".results-date").text("(" + date + ") ");
            //console.log(UVInfo);
            //console.log(UVInfo.date_iso.split("T")[0]);
        })

    //Icon ajax call
    }).then(function() {
        $.ajax({
            url: queryURLIcons,
            method: "GET"
        }).then(function(iconImgs) {
            let iconImg = $(".results-icon").append($('<img/>').attr('src', iconImgs));
            //console.log(iconImgs);
        })

    })

    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function(forecast5Day) {
        $(".card-body").empty();


        //Day 1 of forecast
        //Calling objects
        let day1 = $("#day-1").append(newDiv);
        let date1 = forecast5Day.list[5].dt_txt.split(" ")[0];
        //let iconImg1 =? how do I work with the icons????
        let tempArr = [];
        let forecastTemp;
        let humidityArr = [];
        let forecastHumidity;
     
        //In the array for each day, find the highest temp & humidity
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
    

        //Appending objects
        let addDate1 = day1.append($("<p>").text(date1));
        //addIcon = day1.append($("<img>").iconImage1);
        let addTemp1 = day1.append($("<p>").text("High: " + forecastTemp + " *F"));
        let addHumidity1 = day1.append($("<p>").text("Humidity: " + forecastHumidity + "%"));


        //console.log(forecast5Day.list[5].dt_txt.split(" ")[0])
        //Day 2 of forecast List 8-15
        let day2 = $("#day-2").append(newDiv);
        let date2 = forecast5Day.list[12].dt_txt.split(" ")[0];
        let addDate2 = day2.append($("<p>").text(date2));
        

        //Day 3 of forecast list 16-23
        let day3 = $("#day-3").append(newDiv);
        let date3 = forecast5Day.list[19].dt_txt.split(" ")[0];
        let addDate3 = day3.append($("<p>").text(date3));

        //Day 4 of forecast list 24-31
        let day4 = $("#day-4").append(newDiv);
        let date4 = forecast5Day.list[28].dt_txt.split(" ")[0];
        let addDate4 = day4.append($("<p>").text(date4));

        //Day 5 of forecast list 32-40
        let day5 = $("#day-5").append(newDiv);
        let date5 = forecast5Day.list[37].dt_txt.split(" ")[0];
        let addDate5 = day5.append($("<p>").text(date5));

       console.log(forecast5Day);

    })
});
}

function renderButtons() {
    console.log("beef")
    // Deletes the movies prior to adding new movies
    $("#recent-search").empty();
    // Loops through the array of searches
    for (let i = 0; i < searches.length; i++) {

      // Then dynamicaly generates buttons for each search in the array
      let a = $("<button>");
      // Adds a class of searched to our button
      a.addClass("searched");
      // Added a data-attribute
      a.attr("data-name", searches[i]);
      // Provided the initial button text
      a.text(searches[i]);
      // Added the button to the recent-search div
      $("#recent-search").append(a);
    }
  }

$("#search-btn").on("click", function(event) {

    //Prevents the page from loading another page
    event.preventDefault();
    // This line of code will grab the input from the textbox
    city = $("#city-input").val().trim();
    // The city from the textbox is then added to our array
    searches.push(city);
    // Calling renderButtons which handles the processing of our searches array
    renderButtons();
    displayForecast();

  });

