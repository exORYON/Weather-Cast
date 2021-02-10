const info = document.querySelector(".info");
const spinner = document.querySelector(".spinner");
const blur = document.querySelector(".blur");
const langButton = document.querySelector("#lang-btn");
const themeButton = document.querySelector("#theme-btn");
const startingText = document.querySelector(".starting-text");
const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-inp");
const titleDescr = document.querySelector(".navbar__description");
const searchDescr = document.querySelector(".search__description");
const goHomePage = document.querySelector("#home");
const root = document.querySelector(":root");

let city = localStorage.getItem("city");
let currentWeather = null;

let infoHidden = false;
let spinnerIsActive = true;
let currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  setTheme();
} else {
  currentTheme = "light"
  localStorage.setItem("theme", currentTheme);
}

if (city) {
  showWeather();
} else {
  getCity();
}

let response = null;
function getCity() {
  let request = new XMLHttpRequest();
  request.open('GET', 'https://ip-api.io/json?api_key=e55e4ed9-e9fb-4e7f-b17d-eb27c2b51505');
  request.responseType = 'text';
  request.onload = function () {
    response = JSON.parse(request.response);
    localStorage.setItem("city", response.city); 
    city = response.city;
    setTimeout(() => showWeather(), 1000);
  }
  request.send();
}

function showWeather() {
  currentWeather = getWeather(city);

  setTimeout(() => {
    if (currentWeather === undefined) {
      showTryAgain();
    }

    if (infoHidden) {
      info.style.display = "flex";
    }

    if (spinnerIsActive) {
      spinner.style.display = "none";
      spinnerIsActive = false;
    }

    if (currentLanguage === "RU") {
      info.innerHTML = `
      <div class="weather">
        <h1 class="weather__title">Текущая погода в городе ${city}</h1>
          <div class="weather__cast">
            Температура: <span class="nums">${currentWeather.main.temp}°</span><br>
            Ощущается как: <span class="nums">${currentWeather.main.feels_like}°</span><br>
            Минимальная температура за день: <span class="nums">${currentWeather.main.temp_min}°</span><br>
            Максимальная температура за день: <span class="nums">${currentWeather.main.temp_max}°</span><br>
            Текущее давление: <span class="nums">${currentWeather.main.pressure} гП</span><br>
            Влажность: <span class="nums">${currentWeather.main.humidity}%</span><br>
            Видимость: <span class="nums">${currentWeather.visibility} метров</span><br>
            Скорость ветра: <span class="nums">${currentWeather.wind.speed} м/с</span><br>
            Облачность: <span class="nums">${currentWeather.clouds.all}%</span><br>
          </div>
        <h3>Данные, согласно с сайтом <a href="https://openweathermap.org/api" target="_blank">Open Weather</a></h3>
      </div>`
    } else {
      info.innerHTML = `
      <div class="weather">
        <h1 class="weather__title">Current weather in ${city}</h1>
          <div class="weather__cast">
            Temperature: <span class="nums">${currentWeather.main.temp}°</span><br>
            Feels like: <span class="nums">${currentWeather.main.feels_like}°</span><br>
            Min. day temperature: <span class="nums">${currentWeather.main.temp_min}°</span><br>
            Max. day temperature: <span class="nums">${currentWeather.main.temp_max}°</span><br>
            Current pressure: <span class="nums">${currentWeather.main.pressure} gP</span><br>
            Humidity: <span class="nums">${currentWeather.main.humidity}%</span><br>
            Visibility: <span class="nums">${currentWeather.visibility} meters</span><br>
            Wind speed: <span class="nums">${currentWeather.wind.speed} m/s</span><br>
            Clouds: <span class="nums">${currentWeather.clouds.all}%</span><br>
          </div>
        <h3>Info from <a href="https://openweathermap.org/api" target="_blank">Open Weather</a></h3>
      </div>`
    }
  }, 600)
}

function getWeather(city) {
  const API_key = '10cc54419fe99e60c1fd5c08247978a4';

  requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;
  request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    currentWeather = request.response;
  }
}

function showTryAgain() {
  info.style.display = "none";
  infoHidden = true;

  blur.style.display = "flex"; 
  startingText.style.display = "flex"; 
}

searchButton.addEventListener("click", searchForWeather);
langButton.addEventListener("click", changeLang);
themeButton.addEventListener("click", changeTheme);

function searchForWeather() {
  let currentInput = searchInput.value;
  currentInput.trim();
  let regex = /[a-zа-я]{2,}/i;

  if (regex.test(currentInput)) {
    info.innerHTML = "";
    spinner.style.display = "block";
    spinnerIsActive = true;
    city = currentInput;
    showWeather();
  } else {
    searchInput.style.border = "1px solid rgba(255, 0, 0, 0.45)";
    setTimeout(() => {
      searchInput.style.border = "1px solid var(--border-color)";
    }, 1000);
  }
}

let currentLanguage = localStorage.getItem("lang");
if (currentLanguage === undefined) {
  currentLanguage = "RU";
  localStorage.setItem("lang", currentLanguage);
} else if (currentLanguage === "ENG") {
  setTimeout(() => setLang(), 800);
}

function changeLang() {
  if (currentLanguage === "RU") {
    currentLanguage = "ENG";
    localStorage.setItem("lang", currentLanguage);
  } else {
    currentLanguage = "RU";
    localStorage.setItem("lang", currentLanguage);
  }

  setLang();
}

function setLang() {
  if (currentLanguage === "ENG") {
    titleDescr.innerHTML = "— Check the weather in any city";
    searchDescr.innerHTML = "City name:";
    searchButton.innerHTML = "Check";
    langButton.innerHTML = "ENG";
    info.innerHTML = `
    <div class="weather">
      <h1 class="weather__title">Current weather in ${city}</h1>
        <div class="weather__cast">
          Temperature: <span class="nums">${currentWeather.main.temp}°</span><br>
          Feels like: <span class="nums">${currentWeather.main.feels_like}°</span><br>
          Min. day temperature: <span class="nums">${currentWeather.main.temp_min}°</span><br>
          Max. day temperature: <span class="nums">${currentWeather.main.temp_max}°</span><br>
          Current pressure: <span class="nums">${currentWeather.main.pressure} gP</span><br>
          Humidity: <span class="nums">${currentWeather.main.humidity}%</span><br>
          Visibility: <span class="nums">${currentWeather.visibility} meters</span><br>
          Wind speed: <span class="nums">${currentWeather.wind.speed} m/s</span><br>
          Clouds: <span class="nums">${currentWeather.clouds.all}%</span><br>
        </div>
      <h3>Info from <a href="https://openweathermap.org/api" target="_blank">Open Weather</a></h3>
    </div>`
  } else {
    titleDescr.innerHTML = "— Узнайте погоду в любом городе";
    searchDescr.innerHTML = "Название города:";
    searchButton.innerHTML = "Узнать";
    langButton.innerHTML = "RU";
    info.innerHTML = `
    <div class="weather">
      <h1 class="weather__title">Текущая погода в городе ${city}</h1>
        <div class="weather__cast">
          Температура: <span class="nums">${currentWeather.main.temp}°</span><br>
          Ощущается как: <span class="nums">${currentWeather.main.feels_like}°</span><br>
          Минимальная температура за день: <span class="nums">${currentWeather.main.temp_min}°</span><br>
          Максимальная температура за день: <span class="nums">${currentWeather.main.temp_max}°</span><br>
          Текущее давление: <span class="nums">${currentWeather.main.pressure} гП</span><br>
          Влажность: <span class="nums">${currentWeather.main.humidity}%</span><br>
          Видимость: <span class="nums">${currentWeather.visibility} метров</span><br>
          Скорость ветра: <span class="nums">${currentWeather.wind.speed} м/с</span><br>
          Облачность: <span class="nums">${currentWeather.clouds.all}%</span><br>
        </div>
      <h3>Данные, согласно с сайтом <a href="https://openweathermap.org/api" target="_blank">Open Weather</a></h3>
    </div>
    `;
  }
}

function changeTheme() {
  if (currentTheme === "dark") {
    currentTheme = "light";
  } else {
    currentTheme = "dark";
  }

  localStorage.setItem("theme", currentTheme);
  setTheme();
}

function setTheme() {
  if (currentTheme === "dark") {
    root.style.setProperty("--text-color", "white");
    root.style.setProperty("--footer-header-color", "#202020");
    root.style.setProperty("--additional-color", "#c0c6ca");
    root.style.setProperty("--border-color", "rgba(187, 187, 187, 0.404)");
    root.style.setProperty("--border-color-hover", "1px solid rgb(207, 207, 207)");
    searchButton.style.color = "white";
  } else {
    root.style.setProperty("--text-color", "black");
    root.style.setProperty("--footer-header-color", "#f8f9fa");
    root.style.setProperty("--additional-color", "#6c757d");
    root.style.setProperty("--border-color", "rgba(128, 128, 128, 0.164)");
    root.style.setProperty("--border-color-hover", "1px solid rgba(0, 0, 0, 0.35)");
    searchButton.style.color = "var(--footer-header-color)";
  }
}

goHomePage.onclick = function() {
  location.reload();
}