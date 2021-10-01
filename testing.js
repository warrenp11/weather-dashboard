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
var currentDescriptionEl = document.querySelector("#currentDescription");
var currentHumidityEl = document.querySelector("#currentHumidity");
var currentWindEl = document.querySelector("#currentWind");
var currentUvIndexEl = document.querySelector("#currentUvIndex");
// ** FIVE_DAY_FORECAST_DOC_ELEMENTS
var tempOneEl = document.querySelector("#tempOne");
var highOneEl = document.querySelector("#highOne");
var lowOneEl = document.querySelector("#lowOne");
var humidOneEl = document.querySelector("#humidOne");
var tempTwoEl = document.querySelector("#tempTwo");
var highTwoEl = document.querySelector("#highTwo");
var lowTwoEl = document.querySelector("#lowTwo");
var humidTwoEl = document.querySelector("#humidTwo");
var tempThreeEl = document.querySelector("#tempThree");
var highThreeEl = document.querySelector("#highThree");
var lowThreeEl = document.querySelector("#lowThree");
var humidThreeEl = document.querySelector("#humidThree");
var tempFourEl = document.querySelector("#tempFour");
var highFourEl = document.querySelector("#highFour");
var lowFourEl = document.querySelector("#lowFour");
var humidFourEl = document.querySelector("#humidFour");
var tempFiveEl = document.querySelector("#tempFive");
var highFiveEl = document.querySelector("#highFive");
var lowFiveEl = document.querySelector("#lowFive");
var humidFiveEl = document.querySelector("#humidFive");


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
                console.log(data);
                // console.log(data.current.weather[0]['description']);
                currentWeather(data);
                // send info to fiveDayWeather
                // console.log(`${data.daily[1].temp.day}`);
                // console.log(`${data.daily[1].temp.max}`);
                // console.log(`${data.daily[1].temp.min}`);
                // console.log(`${data.daily[1].humidity}`);
                fiveDayWeather(data);
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
var currentWeather = function(data) {
    weatherDataEl.classList.remove = "d-none";

    // CURRENT TEMP
    var currentTemp = document.createElement('p');
    currentTemp.classList = "weather-info pl-3 mt-1";
    currentTemp.textContent = `Current Temperature: ${data.current['temp']}`;
    currentTempEl.appendChild(currentTemp);

    // CURRENT FEELS LIKE
    var currentFeelsLike = document.createElement('p');
    currentFeelsLike.classList = "weather-info pl-3";
    currentFeelsLike.textContent = `Feels Like: ${data.current['feels_like']}`;
    currentFeelsLikeEl.appendChild(currentFeelsLike);

    // CURRENT HIGH TEMP
    var currentHighTemp = document.createElement('p');
    currentHighTemp.classList = "weather-info pl-3";
    currentHighTemp.textContent = `High: ${data.daily[0].temp['max']}`;
    currentHighTempEl.appendChild(currentHighTemp);

    // CURRENT LOW TEMP
    var currentLowTemp = document.createElement('p');
    currentLowTemp.classList = "weather-info pl-3";
    currentLowTemp.textContent = `Low: ${data.daily[0].temp['min']}`;
    currentLowTempEl.appendChild(currentLowTemp);

    // DESCRIPTION
    var currentDescription = document.createElement('p');
    currentDescription.classList = "weather-info";
    currentDescription.textContent = `Conditions: ${data.current.weather[0]['description']}`;
    currentDescriptionEl.appendChild(currentDescription);

    // HUMIDITY
    var currentHumidity = document.createElement('p');
    currentHumidity.classList = "weather-info";
    currentHumidity.textContent = `Humidity: ${data.current['humidity']}%`;
    currentHumidityEl.appendChild(currentHumidity);

    // WIND
    var currentWind = document.createElement('p');
    currentWind.classList = 'weather-info';
    currentWind.textContent = `Wind Speed: ${data.current['wind_speed']} MPH`;
    currentWindEl.appendChild(currentWind);

    // UV INDEX
    var currentUvIndex = document.createElement('p');
        currentUvIndex.classList = 'weather-info';
        currentUvIndex.textContent = "UV Index: ";

        var indexBadge = document.createElement('span');
            indexBadge.classList = "badge";
            indexBadge.textContent = `${data.current['uvi']}`;

                if (`${data.current['uvi']}` <= 2) {
                    indexBadge.classList = "badge-light p-1";
                } else if (`${data.current['uvi']}` <= 5) {
                    indexBadge.classList = "badge-success p-1";
                } else if (`${data.current['uvi']}` <= 7) {
                    indexBadge.classList = "badge-warning p-1";
                } else if (`${data.current['uvi']}` <= 10) {
                    indexBadge.classList = "badge-danger p-1";
                } else {
                    indexBadge.classList = "badge-dark p-1";
                }

    currentUvIndex.appendChild(indexBadge);
    currentUvIndexEl.appendChild(currentUvIndex);
};

// DISPLAYS FIVE DAY FORECAST INFO (DATE: TEMP, HIGH, LOW, HUMIDITY)
var fiveDayWeather = function(data) {
    // format data to get: date
    // ** date = current date + 1...etc

    // display data in five day forecast container

    // DAY ONE
    // DAY_ONE_TEMP
    var dayOneTemp = document.createElement('p');
    dayOneTemp.textContent = `Temp: ${data.daily[1].temp.day}`;
    tempOneEl.appendChild(dayOneTemp);
    // DAY_ONE_HIGH
    var dayOneHigh = document.createElement('p');
    dayOneHigh.textContent = `High: ${data.daily[1].temp.max}`;
    highOneEl.appendChild(dayOneHigh);
    // DAY_ONE_LOW
    var dayOneLow = document.createElement('p');
    dayOneLow.textContent = `Low: ${data.daily[1].temp.min}`;
    lowOneEl.appendChild(dayOneLow);
    // DAY_ONE_HUMIDITY
    var dayOneHumidity = document.createElement('p');
    dayOneHumidity.textContent = `Humidity: ${data.daily[1].humidity}%`;
    humidOneEl.appendChild(dayOneHumidity);

    // DAY TWO
    var dayTwoTemp = document.createElement('p');
    dayTwoTemp.textContent = `Temp: ${data.daily[2].temp.day}`;
    tempTwoEl.appendChild(dayTwoTemp);

    var dayTwoHigh = document.createElement('p');
    dayTwoHigh.textContent = `High: ${data.daily[2].temp.max}`;
    highTwoEl.appendChild(dayTwoHigh);

    var dayTwoLow = document.createElement('p');
    dayTwoLow.textContent = `Low: ${data.daily[2].temp.min}`;
    lowTwoEl.appendChild(dayTwoLow);

    var dayTwoHumidity = document.createElement('p');
    dayTwoHumidity.textContent = `Humidity: ${data.daily[2].humidity}%`;
    humidTwoEl.appendChild(dayTwoHumidity);

    // DAY THREE
    var dayThreeTemp = document.createElement('p');
    dayThreeTemp.textContent = `Temp: ${data.daily[3].temp.day}`;
    tempThreeEl.appendChild(dayThreeTemp);

    var dayThreeHigh = document.createElement('p');
    dayThreeHigh.textContent = `High: ${data.daily[3].temp.max}`;
    highThreeEl.appendChild(dayThreeHigh);

    var dayThreeLow = document.createElement('p');
    dayThreeLow.textContent = `Low: ${data.daily[3].temp.min}`;
    lowThreeEl.appendChild(dayThreeLow);

    var dayThreeHumidity = document.createElement('p');
    dayThreeHumidity.textContent = `Humidity: ${data.daily[3].humidity}%`;
    humidThreeEl.appendChild(dayThreeHumidity);

    // DAY FOUR
    var dayFourTemp = document.createElement('p');
    dayFourTemp.textContent = `Temp: ${data.daily[4].temp.day}`;
    tempFourEl.appendChild(dayFourTemp);

    var dayFourHigh = document.createElement('p');
    dayFourHigh.textContent = `High: ${data.daily[4].temp.max}`;
    highFourEl.appendChild(dayFourHigh);

    var dayFourLow = document.createElement('p');
    dayFourLow.textContent = `Low: ${data.daily[4].temp.min}`;
    lowFourEl.appendChild(dayFourLow);

    var dayFourHumidity = document.createElement('p');
    dayFourHumidity.textContent = `Humidity: ${data.daily[4].humidity}%`;
    humidFourEl.appendChild(dayFourHumidity);

    // DAY FOUR
    var dayFiveTemp = document.createElement('p');
    dayFiveTemp.textContent = `Temp: ${data.daily[5].temp.day}`;
    tempFiveEl.appendChild(dayFiveTemp);

    var dayFiveHigh = document.createElement('p');
    dayFiveHigh.textContent = `High: ${data.daily[5].temp.max}`;
    highFiveEl.appendChild(dayFiveHigh);

    var dayFiveLow = document.createElement('p');
    dayFiveLow.textContent = `Low: ${data.daily[5].temp.min}`;
    lowFiveEl.appendChild(dayFiveLow);

    var dayFiveHumidity = document.createElement('p');
    dayFiveHumidity.textContent = `Humidity: ${data.daily[5].humidity}%`;
    humidFiveEl.appendChild(dayFiveHumidity);
    
    
}

getCoordinates("Metuchen");