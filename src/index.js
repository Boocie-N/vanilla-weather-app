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
}

function search(city) {
  let apiKey = "33b2dd0bdtf63faf92eoc3485e96bfca";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);

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

search("London");
