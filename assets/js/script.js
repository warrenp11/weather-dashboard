// OPEN_WEATHER_API_KEY = 508c45685c54e0750733e07a9d286ab4
var testApi = "https://api.openweathermap.org/data/2.5/weather?q=Metuchen&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";


var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";
var fiveDayWeatherApi = "https://api.openweathermap.org/data/2.5/forecast?q={city}&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";
var citySearchEl = document.querySelector("#city");
var searchBtnEl = document.querySelector("#searchBtn");
var cityNameEl = document.querySelector(".city-name");
var currentWeatherEl = document.querySelector(".current-weather")
var cityForecastEl = document.querySelector(".city-forecast")


// Search handler
var searchHandler = function(event) {
    event.preventDefault();
    
    var cityInput = citySearchEl.value.trim();
    
    if (cityInput) {
        getLatLong(cityInput);
        citySearchEl.value = "";
    } else {
        alert("Please enter a city");
    }
};


// Get longitude and latitude from city entered
var getLatLong = function(city) {
    var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";
    
    fetch(currentWeatherApi).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                // console.log(data);
                var lat = data.coord["lat"];
                var lon = data.coord["lon"];

                getWeather(lat, lon, city);
            });
        } else {
            alert(`Error: ${response.statusText}`);
        }
    })
    .catch(function(error) {
        alert("Unable to read weather");
    })
};

var getWeather = function(lat, lon, city) {
    var forecastApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";

    fetch(forecastApi).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                // console.log(data.current.weather[0]['description']);
                // displayForecast(data, city);

                console.log(`${data.daily[0].temp['min']}`);
                console.log(`${data.daily[0].temp['max']}`);
            })
        }
    })
};

var displayForecast = function(forecast) {

    cityForecastEl.classList.remove = "d-none";

    // Temperature
    var currentTemp = document.createElement('p');
    currentTemp.classList = "weather-info";
    currentTemp.textContent = `Current Temperature: ${forecast.current['temp']}`;
    currentWeatherEl.appendChild(currentTemp);

    // Feels like
    var currentFeelsLike = document.createElement('p');
    currentFeelsLike.classList = "weather-info";
    currentFeelsLike.textContent = `Feels Like: ${forecast.current['feels_like']}`;
    currentWeatherEl.appendChild(currentFeelsLike);

    // Description
    var currentDescription = document.createElement('p');
    currentDescription.classList = "weather-info";
    currentDescription.textContent = `${forecast.current.weather[0]['description']}`;
    currentWeatherEl.appendChild(currentDescription);

    // Humidity
    var currentHumidity = document.createElement('p');
    currentHumidity.classList = "weather-info";
    currentHumidity.textContent = `Humidity: ${forecast.current['humidity']}%`;
    currentWeatherEl.appendChild(currentHumidity);

    // High Temp
    var currentHighTemp = document.createElement('p');
    currentHighTemp.classList = "weather-info";
    currentHighTemp.textContent = `High: ${forecast.daily[0].temp['max']}`;
    currentWeatherEl.appendChild(currentHighTemp);

    // Low Temp
    var currentLowTemp = document.createElement('p');
    currentLowTemp.classList = "weather-info";
    currentLowTemp.textContent = `High: ${forecast.daily[0].temp['min']}`;
    currentWeatherEl.appendChild(currentLowTemp);

    // Wind Speed
    var currentWind = document.createElement('p');
    currentWind.classList = 'weather-info';
    currentWind.textContent = `Wind Speed: ${forecast.current['wind_speed']} MPH`;
    currentWeatherEl.appendChild(currentWind);

    // UV Index
    var currentUvIndex = document.createElement('p');
    currentUvIndex.classList = 'pl-3 weather-info';
    currentUvIndex.textContent = `UV Index: ${forecast.current['uvi']}`;
    currentWeatherEl.appendChild(currentUvIndex);

};

getLatLong("metuchen");


// Event listener for search button
searchBtnEl.addEventListener("submit", searchHandler);



