function updateForecast(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let detailElement = document.querySelector("#weather-details");
  let humidityElement = document.querySelector("#humidity-detail");
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);
  let emojiElement = document.querySelector("#emoji");

  emojiElement.innerHTML = `<img src= "${response.data.condition.icon_url}" class="emoji" />`;
  dateElement.innerHTML = formatDate(date);
  windElement.innerHTML = `${response.data.wind.speed}mph`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  detailElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "o79b0b278ad643abf38d0abtfa4f526c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateForecast);
}

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "o79b0b278ad643abf38d0abtfa4f526c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class=forecast-section>
      <div class="forecast-day">${day}</div>
      <div class="forecast-emoji">☀️</div>
      <div class="forecast-temp">
      <span class="forecast-high"><strong>80°F</strong></span>
      <span class="forecast-low">75°F</span>
      </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search");
searchFormElement.addEventListener("submit", citySearch);

searchCity("Cleveland");
