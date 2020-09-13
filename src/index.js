function formatDate(timestamp) {
  let date = new Date(timestamp);

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
  let month = months[date.getMonth()];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `Last updated on ${day} at ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatIcon(iconCode) {
  let newWeatherIcon = iconCode;

  if (newWeatherIcon === "01d") {
    return "images/012-sun.png";
  } else if (newWeatherIcon === "01n") {
    return "images/013-halfmoon.png";
  } else if (newWeatherIcon === "02d") {
    return "images/007-cloudsandsun.png";
  } else if (newWeatherIcon === "02n") {
    return "images/002-cloudynight.png";
  } else if (
    newWeatherIcon === "03d" ||
    newWeatherIcon === "04d" ||
    newWeatherIcon === "03n" ||
    newWeatherIcon === "04n"
  ) {
    return "images/009-cloud.png";
  } else if (newWeatherIcon === "09d" || newWeatherIcon === "09n") {
    return "images/023-cloud.png";
  } else if (newWeatherIcon === "10d" || newWeatherIcon === "10n") {
    return "images/006-cloud.png";
  } else if (newWeatherIcon === "11d" || newWeatherIcon === "11n") {
    return "images/018-lightning.png";
  } else if (newWeatherIcon === "13d" || newWeatherIcon === "13n") {
    return "images/010-snow.png";
  } else if (newWeatherIcon === "50d" || newWeatherIcon === "50n") {
    return "images/028-clouds.png";
  } else {
    return "images/004-cloudsandsun.png";
  }
}

function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature-now");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let newIcon = response.data.weather[0].icon;
  let newIconElement = formatIcon(newIcon);

  celsiusTemperature = response.data.main.temp;
  maxCelsiusToday = response.data.main.temp_max;
  minCelsiusToday = response.data.main.temp_min;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  maxTempElement.innerHTML = Math.round(maxCelsiusToday);
  minTempElement.innerHTML = Math.round(minCelsiusToday);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `${newIconElement}`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector(".forecast");
  forecastElement.innerHTML = null;
  let forecast = 0;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    let newIcon = forecast.weather[0].icon;
    let newIconElement = formatIcon(newIcon);

    forecastElement.innerHTML += `<section>
            <h4>${formatHours(forecast.dt * 1000)}</h4>
            <img src=${newIconElement} alt="" />
            <span id="forecast-temperature">${Math.round(
              forecast.main.temp
            )}°</span>
          </section>`;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#input-city");
  console.log(cityInputElement.value);
  searchCity(cityInputElement.value);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function currentLocation(position) {
  let apiKey = "3f134ca2a6c6070d8c666bc9f960b659";
  let apiPositionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiPositionUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(city) {
  let apiKey = "3f134ca2a6c6070d8c666bc9f960b659";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  let searchInput = document.querySelector("#input-city");
  searchInput.value = "";
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-now");
  let maxTempTodayElement = document.querySelector("#max-temp");
  let minTempTodayElement = document.querySelector("#min-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperatureNow = (celsiusTemperature * 9) / 5 + 32;
  let maxFahrenheitToday = (maxCelsiusToday * 9) / 5 + 32;
  let minFahrenheitToday = (minCelsiusToday * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperatureNow);
  maxTempTodayElement.innerHTML = Math.round(maxFahrenheitToday);
  minTempTodayElement.innerHTML = Math.round(minFahrenheitToday);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-now");
  let maxTempTodayElement = document.querySelector("#max-temp");
  let minTempTodayElement = document.querySelector("#min-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  maxTempTodayElement.innerHTML = Math.round(maxCelsiusToday);
  minTempTodayElement.innerHTML = Math.round(minCelsiusToday);
}

let celsiusTemperature = null;
let maxCelsiusToday = null;
let minCelsiusToday = null;
searchCity("Stavanger");

let searchCityForm = document.querySelector(".search-city-form");
searchCityForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
