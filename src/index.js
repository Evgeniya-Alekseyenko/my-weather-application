  let currentTime = new Date();
  function formatDate(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
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
      "December"
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
    if (minutes < 10 ) {
    timeHeading.innerHTML = `Current time:  ${hour} : 0${minutes}`;
    } else {
        timeHeading.innerHTML = `Current time: ${hour} : ${minutes}`;
    }
    return formattedDate;
  }
  console.log(formatDate(currentTime));

let apiKey = "e4dc49ce2bc5d1c1459936259cc8c63f";
let unit = "units=metric";
let url = "https://api.openweathermap.org/data/2.5/weather?";
let inputCity = document.querySelector("#city-input");

function showCity(response) {
  let cityName = document.querySelector("#city-name");
  let cityTemp = document.querySelector("#temp-data");
  let cityPressure = document.querySelector('#pressure');
  let humidity = document.querySelector("#humidity");
  let speedWind = document.querySelector("#wind");
  cityName.innerHTML = response.data.name;
  cityTemp.innerHTML =` ${Math.round(response.data.main.temp)}℃`;
  humidity.innerHTML =` Humidity: ${response.data.main.humidity}%`;
  console.log(response);
  console.log(response.data.weather[0].main);
  speedWind.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  cityPressure.innerHTML = `Pressure: ${response.data.main.pressure}mbar`;
  console.log(response.data.main.pressure)
}

function showCityWeather(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#city-input");
    let cityUrl = `${url}q=${inputCity.value}&${unit}&appid=${apiKey}`;
    if (inputCity.value.length !== 0) {
      axios.get(cityUrl).then(showCity);
    } else {
      alert("Enter the the city!");
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
  btn.addEventListener("click", showCurrentCityWeather)

  

  let switchMode = document.getElementById("switchMode");

  switchMode.onclick = function () {
    let theme = document.getElementById("theme");

    if (theme.getAttribute("href") == "src/style/light-mode.css") {
      theme.href = "src/style/dark-mode.css";
    } else {
      theme.href = "src/style/light-mode.css"
    }
  }

  document.getElementById("clearButton").onclick = function(e) {
    // Если необходимо предотвратить/отменить событие по умолчанию,
    // то необходимо вызвать метод preventDefault у события
    // https://developer.mozilla.org/ru/docs/Web/API/Event/preventDefault
    // e.preventDefault();
    // если необходимо также предотвратить дальнейшее "всплытие" события,
    // то необходимо вызвать метод stopPropagation у события
    // https://developer.mozilla.org/ru/docs/Web/API/Event/stopPropagation
    // e.stopPropagation();
    document.getElementById("city-input").value = "";
  }
 