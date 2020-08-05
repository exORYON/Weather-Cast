let weatherContainer, weatherInfo, section,request, requestURL, city, alertSuccess, alertContainer, result;
const API_key = '10cc54419fe99e60c1fd5c08247978a4';

alertContainer = document.getElementById('alert-container');
city = document.getElementById('search-input').value = 'Ирпень';
headerText = document.getElementById('header-text');
weatherContainer = document.getElementById('weatherResult');

function cityChange() {
    city = document.getElementById('search-input').value;
}

function discoverWeather() {
    requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;
    request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        result = request.response;
        alertSuccess = document.createElement('div');
        alertContainer.append(alertSuccess);
        alertSuccess.classList.add('alert-success');
        let alert = document.querySelector('.alert-success');
        alert.innerHTML = 'Погода успешно загружена';
        setTimeout(deleteAlert, 4000);
        console.log(result);
        weatherContainer.innerHTML = `<br><hr><h6>Текущая температура: ${result.main.temp}° <br>
        Ощущается как: ${result.main.feels_like}° <br><br>
        Минимальная температура за день: ${result.main.temp_min}° <br>
        Максимальная температура за день: ${result.main.temp_max}° <br><hr>
        Текущее давление: ${result.main.pressure} гектоПаскалей<br>
        Влажность: ${result.main.humidity}% <br>
        Видимость: ${result.visibility} метров <br><hr>
        Скорость ветра: ${result.wind.speed} м/с <br>
        Облачность: ${result.clouds.all}% <br><hr>
        </h6>`;
    }
        function deleteAlert() {
            let alert = document.querySelector('.alert-success');
            alert.remove();
        }

    headerText.innerHTML = `Погода в городе ${city}`;
}