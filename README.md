# WeatherDashboard
An interactive weather app using a weather API.

## User Story
* As a traveler,
* I want to see the weather outlook for multiple cities
* so that I can plan a trip accordingly.

## Use
* This app exists to help people look at weather forecasts in various cities. This info is materialized through the use of a weather API. 

* Search for a city in the search bar on the left. Results will populate on the right.

* Results will include the current day's forecast and a 5 day forecast. 

* Previously searched cities are saved to local storage and a new button is created for that city. If a user wants to revisit a recently searched city, they can click the button and the forecast of that city will repopulate on the right. 

* App is equipped with a button to delete local storage and the recently searched list when the user is ready to clear their search history. 

## Difficulties
* The API documentation was a bit difficult to understand in regards to the icons. It initially looked like a separate ajax call would be required. After attempting to make that work and it failing, I had to ask for assistance finding the correct call for the icons. 

* In the API object for the 5 day forecast, they provide an array of 40 forecasts, each 3 hours apart. The hours shift slightly depending on the time of day. For example, in the mornings, I observed index 0 would be for 21:00 on the current day and then the times would continue from there (ie. 0 = 21:00 same day; 1 = 00:00 day+1; 2 = 03:00 day+1; 3 = 06:00 day+1, etc.). However in the afternoons, index 0 would start at 00:00 of the next day. 

Due to this shift, I wanted to find the the highest temp/humidity forecasted within that day's array objects (day 1 = array objects 0-7; day 2 = array objects 8-15, etc.).

However, I was unable to make this part of the code work at this time. I may revisit this code in the future to see if I can program this part of the code.

* The UV data was not in the original ajax call. Per the AIP documentation, another call would need to be made using the city's latitude and longitude. I had difficulty figuring out how to nest this ajax call. Ultimately I walked through this process with my tutor and we came up with the current formatting.

* I currently have a bug where the recently searched buttons only work before a new city is added. 

## Sucesses
* I learned a lot about how to read APIs and their documentation during this project. There were several parts we needed to call and/or reference. 

* In the assignment, a clear history was not required. For my own sake, I needed a way to clear the history. This clear button seemed practical for me during the programming process and for the user. 
