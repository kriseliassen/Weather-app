function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function currentLocation(position) {
  let apiKey = "3f134ca2a6c6070d8c666bc9f960b659";
  let units = "metric";
  let apiPositionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;

  axios.get(apiPositionUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "3f134ca2a6c6070d8c666bc9f960b659";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
  let searchInput = document.querySelector("#input-city");
  searchInput.value = "";
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-now").innerHTML =
    response.data.weather[0].description;
}

function showFahrenheit(event) {
  event.preventDefault();
  let actualTempSelector = document.querySelector("#temp-now");
  let actualTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  actualTempSelector.innerHTML = actualTemp;
  let actualTempType = document.querySelector("#c-f-marking");
  actualTempType.innerHTML = "°F";
}

function showCelsius(event) {
  event.preventDefault();
  let actualTempSelector = document.querySelector("#temp-now");
  actualTempSelector.innerHTML = celsiusTemperature;
  let actualTempType = document.querySelector("#c-f-marking");
  actualTempType.innerHTML = "°C";
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

let celsiusTemperature = 21;

let actualFahrenheit = document.querySelector("#fahrenheit");
actualFahrenheit.addEventListener("click", showFahrenheit);

let actualCelsius = document.querySelector("#celsius");
actualCelsius.addEventListener("click", showCelsius);

let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();
let date = now.getDate();
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
let month = months[now.getMonth()];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let rightNow = document.querySelector("#right-now");
rightNow.innerHTML = `Right now, ${day} ${month} ${date} at ${hour}:${minute}, it's`;
