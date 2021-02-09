let city = localStorage.getItem("city");
let currentWeather = null;

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
  const spinner = document.querySelector(".spinner");
  const info = document.querySelector(".info");
  currentWeather = getWeather(city);

  setTimeout(() => {
    spinner.remove();
    info.innerHTML = `
    <div class="weather">
      <h1 class="weather__title">Текущая погода в городе ${city}</h1>
        <div class="weather__cast">
          Температура: ${currentWeather.main.temp}°<br>
          Ощущается как: ${currentWeather.main.feels_like}°<br>
          Минимальная температура за день: ${currentWeather.main.temp_min}°<br>
          Максимальная температура за день: ${currentWeather.main.temp_max}°<br>
          Текущее давление: ${currentWeather.main.pressure} гектоПаскалей<br>
          Влажность: ${currentWeather.main.humidity}%<br>
          Видимость: ${currentWeather.visibility} метров<br>
          Скорость ветра: ${currentWeather.wind.speed} м/с<br>
          Облачность: ${currentWeather.clouds.all}%<br>
        </div>
      <h3>Данные, согласно с сайтом Weather Map</h3>
    </div>`
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