// OPEN_WEATHER_API_KEY = 508c45685c54e0750733e07a9d286ab4
// TEST_API_(METUCHEN)
// var testApi = "https://api.openweathermap.org/data/2.5/weather?q=Metuchen&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";

// APIS
var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";
var fiveDayWeatherApi = "https://api.openweathermap.org/data/2.5/forecast?q={city}&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";

// DOCUMENT_ELEMENTS
var weatherDataEl = document.querySelector("#weather-data");
// ** CURRENT_WEATHER_DOC_ELEMENTS
var currentTempEl = document.querySelector("#currentTemp");
var currentFeelsLikeEl = document.querySelector("#currentFeelsLike");
var currentHighTempEl = document.querySelector("#currentHighTemp");
var currentLowTempEl = document.querySelector("#currentLowTemp");



// GET LAT AND LON AND CITY NAME FROM USER SEARCH IN ORDER TO GET 5-DAY FORECAST
var getCoordinates = function(city) {
    var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";
    
    fetch(currentWeatherApi).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                // console.log(data);
                var lat = data.coord["lat"];
                var lon = data.coord["lon"];
                var searchedCityName = data.name;
                // console.log(data.name);

                getName(searchedCityName);
                getForecastData(lat, lon);
            });
        } else {
            alert(`Error: ${response.statusText}`);
        }
    })
    .catch(function(error) {
        alert("Unable to read weather");
    });
};

// USES LAT AND LON FROM getCoordinates() TO GET 5-DAY FORECAST AND OTHER INFO 
var getForecastData = function(lat, lon) {
    var forecastApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=508c45685c54e0750733e07a9d286ab4";

    fetch(forecastApi).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                // console.log(data);
                // console.log(data.current.weather[0]['description']);
                currentWeather(data);
               
            });
        }
    });
};

// DISPLAYS SELECTED CITY'S NAME AT TOP OF CURRENT FORECAST CONTAINER
var getName = function(name) {
    var cityName = document.createElement('h4');
    cityName.textContent = `${name}`;
    var cityNameEl = document.querySelector("#city-name");
    cityNameEl.appendChild(cityName);
};

// DISPLAYS CURRENT WEATHER
var currentWeather = function(forecast) {
    weatherDataEl.classList.remove = "d-none";

    // CURRENT TEMP
    var currentTemp = document.createElement('p');
    currentTemp.classList = "weather-info pl-3 mt-1";
    currentTemp.textContent = `Current Temperature: ${forecast.current['temp']}`;
    currentTempEl.appendChild(currentTemp);

    // CURRENT FEELS LIKE
    var currentFeelsLike = document.createElement('p');
    currentFeelsLike.classList = "weather-info pl-3";
    currentFeelsLike.textContent = `Feels Like: ${forecast.current['feels_like']}`;
    currentFeelsLikeEl.appendChild(currentFeelsLike);

    // CURRENT HIGH TEMP
    var currentHighTemp = document.createElement('p');
    currentHighTemp.classList = "weather-info pl-3";
    currentHighTemp.textContent = `High: ${forecast.daily[0].temp['max']}`;
    currentHighTempEl.appendChild(currentHighTemp);

    // CURRENT LOW TEMP
    var currentLowTemp = document.createElement('p');
    currentLowTemp.classList = "weather-info pl-3";
    currentLowTemp.textContent = `Low: ${forecast.daily[0].temp['min']}`;
    currentLowTempEl.appendChild(currentLowTemp);
};

getCoordinates("Metuchen");