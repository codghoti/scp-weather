let daysShort = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

let monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let now = new Date();
let day = daysShort[now.getDay()];
let month = monthsShort[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDateTime = document.querySelector("#current-date-time");
currentDateTime.innerHTML = `${day} | ${month} ${date} | ${hours}:${minutes}`;

let day2 = document.querySelector("#day-2");
let day3 = document.querySelector("#day-3");
let day4 = document.querySelector("#day-4");
let day5 = document.querySelector("#day-5");
let day6 = document.querySelector("#day-6");

// There must be a way to do the following with a loop, but...maybe I'll figure that out later.
day2.innerHTML = `${daysShort[now.getDay() + 1]}`;
day3.innerHTML = `${daysShort[now.getDay() + 2]}`;
day4.innerHTML = `${daysShort[now.getDay() + 3]}`;
day5.innerHTML = `${daysShort[now.getDay() + 4]}`;
day6.innerHTML = `${daysShort[now.getDay() + 5]}`;

let currentTempScale = document.querySelector("#current-temp-scale");
let changeTempScale = document.querySelector("#change-temp-scale");
let currentTempNumber = document.querySelector("#current-temp-number");

function convertTemp(event) {
  event.preventDefault();
  if (currentTempScale.innerHTML === "C") {
    currentTempNumber.innerHTML = Math.round(
      (Number(currentTempNumber.innerHTML) * 9) / 5 + 32
    );
    currentTempScale.innerHTML = "F";
    changeTempScale.innerHTML = "ºC";
  } else {
    currentTempNumber.innerHTML = Math.round(
      (Number(currentTempNumber.innerHTML) - 32) * (5 / 9)
    );
    currentTempScale.innerHTML = "C";
    changeTempScale.innerHTML = "ºF";
  }
}

changeTempScale.addEventListener("click", convertTemp);

// API stuff

function getFirstWeather(response) {
  let firstTemp = response.data.main.temp;
  currentTempNumber.innerHTML = Math.round(firstTemp);
}

function getNewWeather(response) {
  let newTemp = response.data.main.temp;
  currentTempNumber.innerHTML = Math.round(newTemp);
}

function getNewCity(event) {
  event.preventDefault();
  let citySearchInput = document.querySelector("#city-search-input");
  let citySearched = citySearchInput.value;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = citySearched;
  citySearchInput.value = null;
  let newApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&units=metric&appid=${apiKey}`;
  axios.get(newApiUrl).then(getNewWeather);
}

let apiKey = "f30da1b966664c64d4422fa3d9b4ab45";
let cityName = "Phuket";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(getFirstWeather);

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", getNewCity);

// Current location stuff

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocationWeather);
}

function getCurrentLocationWeather(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrlPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlPosition).then(showCurrentLocationWeather);
}

function showCurrentLocationWeather(response) {
  let newTemp = response.data.main.temp;
  currentTempNumber.innerHTML = Math.round(newTemp);
  let newCity = response.data.name;
  console.log(newCity);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = newCity;
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);
