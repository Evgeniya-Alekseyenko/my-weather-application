// Getting the current date and time

let currentTime = new Date();

function formatDate(date) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let currentYear = date.getFullYear();
    let currentDay = days[date.getDay()];
    let currentMonth = months[date.getMonth()];
    let currentDate = date.getDate();

    let hour = date.getHours();
    let minutes = date.getMinutes();

    let formattedDate = `Today is ${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
    let dateHeding = document.querySelector("h4");
    dateHeding.innerHTML = `Today is ${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

    let timeHeading = document.querySelector(".time");
    if (minutes < 10) {
        timeHeading.innerHTML = `Current time:  ${hour} : 0${minutes}`;
    } else if (hour < 10) {
        timeHeading.innerHTML = `Current time: 0${hour} : ${minutes}`;
    } else {
        timeHeading.innerHTML = `Current time: ${hour} : ${minutes}`;
    }
    return formattedDate;
}
formatDate(currentTime);

let apiKey = "e4dc49ce2bc5d1c1459936259cc8c63f";
let url = "https://api.openweathermap.org/data/2.5/weather?";
// let inputCity = document.querySelector("#city-input");

function showHoursForSunMove(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    showHoursForSunMove;
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

function showCity(response) {
    // if (!response.data){
    // controller.abort()
    // }
    let cityName = document.querySelector("#city-name");
    let cityTemp = document.querySelector("#temp-data");
    let cityWeather = document.querySelector("#description");
    let cityPressure = document.querySelector("#pressure");
    let humidity = document.querySelector("#humidity");
    let speedWind = document.querySelector("#wind");
    let weatherIcon = document.querySelector("#weatherIcon");
    let sunrise = document.querySelector("#sunrise");
    let sunset = document.querySelector("#sunset");

    cityName.innerHTML = response.data.name;
    celsiusTemp = response.data.main.temp;
    cityTemp.innerHTML = Math.round(celsiusTemp);
    humidity.innerHTML = ` Humidity: ${response.data.main.humidity} %`;
    cityWeather.innerHTML = response.data.weather[0].description;
    speedWind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
    cityPressure.innerHTML = `Pressure: ${response.data.main.pressure}mbar`;

    sunrise.innerHTML = `<img
    src="src/img/Sun_Outline.svg" width="80px"/>Sunrise: ${showHoursForSunMove(
        response.data.sys.sunrise * 1000
    )}`;
    sunset.innerHTML = `<img
    src="src/img/Dream_Flatline.svg" width="80px"/>Sunset: ${showHoursForSunMove(
        response.data.sys.sunset * 1000
    )}`;

    weatherIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherIcon.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function showCityWeather(inputCity) {
    // event.preventDefault();
    // let inputCity = document.querySelector("#city-input");
    // let cityUrl = `${url}q=${inputCity.value}&units=metric&appid=${apiKey}`;
    // if (inputCity.value.length !== 0) {
    // const controller = new AbortController();
    // axios
    //     .get(cityUrl, {
    //         signal: controller.signal,
    //     })
    //     .catch(function (error) {
    //         if (error.response) {
    //             // The request was made and the server responded with a status code
    //             // that falls out of the range of 2xx
    //             alert(error.response.data.message);
    //         } else if (error.request) {
    //             // The request was made but no response was received
    //             alert("The service is unavailable\nPleace try again later");
    //         } else {
    //             // Something happened in setting up the request that triggered an Error
    //             alert("Error", error.message);
    //         }
    //         controller.abort();
    //     })
    //     .then(showCity);
    // axios.get(cityUrl).then(showCity);
    // }
}
function searchCityWeather(city) {
    let apiKey = "e4dc49ce2bc5d1c1459936259cc8c63f";
    let cityUrl = `${url}q=${city}&units=metric&appid=${apiKey}`;
    // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(cityUrl).then(showCity);
}

function handleSubmit(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#city-input");
    searchCityWeather(inputCity.value);
}

let formSearchCity = document.querySelector("#city-form");
formSearchCity.addEventListener("submit", showCityWeather);

// Added the forecast

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                `
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
            )}°</span> /
            <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
            )}° </span>
          </div>
        </div>
    `;
        }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "e4dc49ce2bc5d1c1459936259cc8c63f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

// Bonus point: Added a Current Location button

function showPosition(position) {
    let currentLongitude = position.coords.longitude;
    let currentLatitude = position.coords.latitude;
    let currentCityUrl = `${url}lat=${currentLatitude}&lon=${currentLongitude}&units=metric&appid=${apiKey}`;
    axios.get(currentCityUrl).then(showCity);
    inputCity.value = null;
}

function showCurrentCityWeather(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

let btn = document.querySelector("#currentBtn");
btn.addEventListener("click", showCurrentCityWeather);

// Additional functionality: adding a dark theme, and the ability to change the light theme to a dark one

let switchMode = document.getElementById("switchMode");

switchMode.onclick = function () {
    let theme = document.getElementById("theme");

    if (theme.getAttribute("href") == "src/style/light-mode.css") {
        theme.href = "src/style/sky-mode.css";
    } else if (theme.getAttribute("href") == "src/style/sky-mode.css") {
        theme.href = "src/style/dark-mode.css";
    } else {
        theme.href = "src/style/light-mode.css";
    }
};
// Added a function to convert degrees Celsius to Fahrenheit

function showFahrenheitTemperature(e) {
    e.preventDefault();
    let cityTemp = document.querySelector("#temp-data");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheiTemperature = (celsiusTemp * 9) / 5 + 32;
    cityTemp.innerHTML = Math.round(fahrenheiTemperature);
}

function showCelsiusTemperature(e) {
    e.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let cityTemp = document.querySelector("#temp-data");
    cityTemp.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahr");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#cels");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCityWeather("Kharkiv");
