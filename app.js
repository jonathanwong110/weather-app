const api = {
  key: 'e01647c9c5dadc15665aef166b1bebb4',
  base: 'https://api.openweathermap.org/data/2.5/'
}

const searchbox = document.querySelector('.weather-search');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getWeather(searchbox.value);
  }
}

function getWeather(query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayWeather);
}

function displayWeather(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now)

  let temp = document.querySelector('.current .temperature');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`

  let time = document.querySelector('.current .time')
  time.innerHTML = "as of" + ' ' + new Date().toLocaleTimeString();

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.low-high');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${month} ${date}, ${year}`;
}
