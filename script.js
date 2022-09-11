'use strict';

const apikey = '7c89dfc6b8c54ab5daa516325e286b4b';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const container = document.createElement('div');
main.appendChild(container);
container.classList.add('container');

const url = (city) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
};

const showInfo = (weather) => {
  return {
    img: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
    info: weather.weather[0].main,
  };
};

const convertToCelcium = (degree) => (degree - 273).toFixed(2);

const showWeather = (weather) => {
  const temp = convertToCelcium(weather.main.temp);
  const show = showInfo(weather);
  container.innerHTML = `
        <h2><img src=${show.img} /> ${temp}°C <img src=${show.img} /></h2>
        <small>${show.info}</small>
    `;
};

const getWeather = (city) => {
  fetch(url(city))
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      container.innerHTML = `<small>Cant get weather info</small>`;
    })
    .then((weather) => {
      showWeather(weather);
    })
    .catch((error) => {
      console.log(error);
      container.innerHTML = `<small>No such city</small>`;
    });
};

form.addEventListener('submit', (e) => {
  const city = search.value;
  if (city) getWeather(city);
  e.preventDefault();
});
