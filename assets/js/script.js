// var owApiKey = "508c45685c54e0750733e07a9d286ab4";
var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q={city}&appid=508c45685c54e0750733e07a9d286ab4";
var fiveDayWeatherApi = "https://api.openweathermap.org/data/2.5/forecast?q={city}&appid=508c45685c54e0750733e07a9d286ab4";



var testCityCurrent = "https://api.openweathermap.org/data/2.5/weather?q=Springfield&appid=508c45685c54e0750733e07a9d286ab4";
console.log(testCityCurrent);
var testCityFive = "https://api.openweathermap.org/data/2.5/forecast?q=Springfield&appid=508c45685c54e0750733e07a9d286ab4";
console.log(testCityFive);

// get current weather for city
fetch(testCityCurrent).then(function(response) {
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
        });
    }
});

// Get five day forecast for city
fetch(testCityFive).then(function(response) {
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
        });
    }
});

