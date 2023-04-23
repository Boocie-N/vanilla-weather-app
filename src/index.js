function currentDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  return `${day} ${hours}:${minutes}`;
}

function requestForecast(coordinates) {
  let apiKey = "33b2dd0bdtf63faf92eoc3485e96bfca";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function displayTemp(response) {
  console.log(response.data);
  let temperature = document.querySelector("#main-temp");
  temperature.innerHTML = Math.round(response.data.temperature.current);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;

  celTemp = Math.round(response.data.temperature.current);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let realFeel = document.querySelector("#real-feel");
  realFeel.innerHTML = Math.round(response.data.temperature.feels_like);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let date = document.querySelector("#date");
  date.innerHTML = currentDate(response.data.time * 1000);

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  requestForecast(response.data.coordinates);
}
function showForecast(response) {
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2 daily">
              <h4>${day}</h4>
              <img
              class="weather-icon"
              src="data:image/jpeg;base64,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"
              alt="sunny"
                width="60px"
                />
              <p>
                <strong>28<span>°</span></strong> 18<span>°</span>
                </p>
                </div>
                `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "33b2dd0bdtf63faf92eoc3485e96bfca";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}
function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
}

function showCel(event) {
  event.preventDefault();
  farLink.classList.remove("selected");
  celLink.classList.add("selected");
  let temp = document.querySelector("#main-temp");
  temp.innerHTML = celTemp;
}

function showFar(event) {
  event.preventDefault();
  celLink.classList.remove("selected");
  farLink.classList.add("selected");
  let farValue = Math.round((celTemp * 9) / 5 + 32);
  let temp = document.querySelector("#main-temp");
  temp.innerHTML = farValue;
}

let celTemp = null;

let farLink = document.querySelector("#far-link");
farLink.addEventListener("click", showFar);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", showCel);

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

showForecast();
search("London");
