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
let unit = "units=metric";
let url = "https://api.openweathermap.org/data/2.5/weather?";
let inputCity = document.querySelector("#city-input");

function showCity(response) {
    let cityName = document.querySelector("#city-name");
    let cityTemp = document.querySelector("#temp-data");
    let cityWeather = document.querySelector("#description");
    let cityPressure = document.querySelector("#pressure");
    let humidity = document.querySelector("#humidity");
    let speedWind = document.querySelector("#wind");
    let weatherIcon = document.querySelector("#weatherIcon");
    cityName.innerHTML = response.data.name;
    // cityTemp.innerHTML = ` ${Math.round(response.data.main.temp)}℃`;

    celsiusTemp = response.data.main.temp;
    cityTemp.innerHTML = Math.round(celsiusTemp);


    humidity.innerHTML = ` Humidity: ${response.data.main.humidity} %`;
    cityWeather.innerHTML = response.data.weather[0].description;
    speedWind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
    cityPressure.innerHTML = `Pressure: ${response.data.main.pressure}mbar`;
    weatherIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function showCityWeather(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#city-input");
    let cityUrl = `${url}q=${inputCity.value}&${unit}&appid=${apiKey}`;
    if (inputCity.value.length !== 0) {
        axios.get(cityUrl).then(showCity);
    } else {
        alert("Enter the city!");
    }
}
let formSearchCity = document.querySelector("#city-form");
formSearchCity.addEventListener("submit", showCityWeather);

// Bonus point: Add a Current Location button

function showPosition(position) {
    let currentLongitude = position.coords.longitude;
    let currentLatitude = position.coords.latitude;
    let currentCityUrl = `${url}lat=${currentLatitude}&lon=${currentLongitude}&${unit}&appid=${apiKey}`;
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
        theme.href = "src/style/dark-mode.css";
    } else {
        theme.href = "src/style/light-mode.css";
    }
};

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


// setInterval(()=>{
//   const vemekunys = document.querySelector(".uncomenkad #vemekunys");
//   let date = new Date();
//   let hours = date.getHours();
//   let minutes = date.getMinutes();
//   let seconds = date.getSeconds();
//   let day_night = "AM";
//   if(hours > 12){
//   day_night = "PM";
//   hours = hours - 12;
//   }
//   if(seconds < 10){
//   seconds = "0" + seconds;
//   }
//   if(minutes < 10){
//   minutes = "0" + minutes;
//   }
//   if(hours < 10){
//   hours = "0" + hours;
//   }
//   vemekunys.textContent = hours + ":" + minutes + ":" + seconds + " "+ day_night;
//   });
