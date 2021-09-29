// OPEN_WEATHER_API_KEY = 508c45685c54e0750733e07a9d286ab4
var testApi = "https://api.openweathermap.org/data/2.5/weather?q=Metuchen&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";


var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";
var fiveDayWeatherApi = "https://api.openweathermap.org/data/2.5/forecast?q={city}&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";
var citySearchEl = document.querySelector("#cityInput");
var searchBtnEl = document.querySelector("#searchBtn");
var cityNameEl = document.querySelector(".city-name");
var currentWeatherEl = document.querySelector(".current-weather")
var cityForecastEl = document.querySelector(".city-forecast")


// Search handler
var searchHandler = function(event) {
    event.preventDefault();
    
    var citySearch = citySearchEl.value.trim();
    
    if (citySearch) {
        getLatLong(citySearch);
        citySearchEl.value = "";
    } else {
        alert("Please enter a city");
    }
};


// Get longitude and latitude from city entered
var getCoord = function(city) {
    var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";
    
    fetch(currentWeatherApi).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                // console.log(data);
                var lat = data.coord["lat"];
                var lon = data.coord["lon"];

                getForecast(lat, lon);
            });
        } else {
            alert(`Error: ${response.statusText}`);
        }
    })
    .catch(function(error) {
        alert("Unable to read weather");
    });
};

var getForecast = function(lat, lon) {
    var forecastApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";

    fetch(forecastApi).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                // console.log(data);
                // console.log(data.current.weather[0]['description']);
                displayForecast(data);
               
            });
        }
    });
};

var displayForecast = function(forecast) {

    cityForecastEl.classList.remove = "d-none";

    // Temperature
    var currentTemp = document.createElement('p');
    currentTemp.classList = "weather-info pl-3 mt-1";
    currentTemp.textContent = `Current Temperature: ${forecast.current['temp']}`;
    currentWeatherEl.appendChild(currentTemp);

    // Feels like
    var currentFeelsLike = document.createElement('p');
    currentFeelsLike.classList = "weather-info pl-3";
    currentFeelsLike.textContent = `Feels Like: ${forecast.current['feels_like']}`;
    currentWeatherEl.appendChild(currentFeelsLike);

    // High Temp
    var currentHighTemp = document.createElement('p');
    currentHighTemp.classList = "weather-info pl-3";
    currentHighTemp.textContent = `High: ${forecast.daily[0].temp['max']}`;
    currentWeatherEl.appendChild(currentHighTemp);

    // Low Temp
    var currentLowTemp = document.createElement('p');
    currentLowTemp.classList = "weather-info pl-3";
    currentLowTemp.textContent = `Low: ${forecast.daily[0].temp['min']}`;
    currentWeatherEl.appendChild(currentLowTemp);

    // // Description
    // var currentDescription = document.createElement('p');
    // currentDescription.classList = "weather-info";
    // currentDescription.textContent = `Conditions: ${forecast.current.weather[0]['description']}`;
    // currentWeatherEl.appendChild(currentDescription);

    // // Humidity
    // var currentHumidity = document.createElement('p');
    // currentHumidity.classList = "weather-info";
    // currentHumidity.textContent = `Humidity: ${forecast.current['humidity']}%`;
    // currentWeatherEl.appendChild(currentHumidity);

    // // Wind Speed
    // var currentWind = document.createElement('p');
    // currentWind.classList = 'weather-info';
    // currentWind.textContent = `Wind Speed: ${forecast.current['wind_speed']} MPH`;
    // currentWeatherEl.appendChild(currentWind);

    // // UV Index
    // var currentUvIndex = document.createElement('p');
    // currentUvIndex.classList = 'pl-3 weather-info';
    // currentUvIndex.textContent = `UV Index: ${forecast.current['uvi']}`;
    // currentWeatherEl.appendChild(currentUvIndex);

};

getCoord("Metuchen");


// Event listener for search button
searchBtnEl.addEventListener("submit", searchHandler);



