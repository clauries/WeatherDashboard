//OpenWeatherMap API key
const APIKey = "1349b8658e08989cac6393f5e9d7b731";
let city = "portland";
let latitude
let longitude
let icon

// OpenWeatherMap URL
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
let queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
let queryURLUV
let queryIcons

// OpenWeatherMap AJAX call for class = results
$(document).ready(function() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(weather) {
        let city = $(".results-city").text(weather.name + " ");
        //let icon = $(".results-icon").append(weather.weather[0].icon);
        let temp = $(".results-temp").append(weather.main.temp + " *F");
        let humidity = $(".results-humidity").append(weather.main.humidity + "%");
        let wind = $(".results-wind").append(weather.wind.speed + " miles/hour");
        latitude = weather.coord.lat;
        longitude = weather.coord.lon; 
        icon = weather.weather[0].icon;
        
        queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";
        queryURLIcons = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        console.log(weather);
        console.log(latitude);
        console.log(longitude);
        console.log(weather.weather[0].icon)

    // UV ajax call  
    }).then(function() {
        $.ajax({
            url: queryURLUV,
            method: "GET"
        }).then(function(UVInfo) {
            let uvIndex = $(".results-uv").append(UVInfo.value);
            let date = UVInfo.date_iso.split("T")[0];
            let currentDate = $(".results-date").text("(" + date + ") ");
            console.log(UVInfo);
            console.log(UVInfo.date_iso.split("T")[0]);
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
        //Day 1 of forecast
        let day1 = $("#day-1");
        let date1 = forecast5Day.list[5].dt_txt.split(" ")[0]
        day1.append(date1);

        console.log(forecast5Day.list[5].dt_txt.split(" ")[0])
        //Day 2 of forecast
        //let date2 =
        //Day 3 of forecast
        //let date3 =
        //Day 4 of forecast
        //let date4 =
        //let date5 =
    
       // console.log(forecast5Day);
    })
});


//div class results-five-day
    //date .text
    //icon .text
    //Temp: append temp
        //currently just one temp. Could do high and low?
    //Humidity: append humidity

