const searchOperation = {
    searchbtn: document.querySelector('#searchbtn'),
    searchLabel: document.querySelector('#search')
}
const elementsToOutput = {
    warning: document.querySelector('#warning'),
    cityName: document.querySelector('#city'),
    image: document.querySelector('#icon'),
    temperature: document.querySelector('#temp'),
    feelsLikeTemp: document.querySelector('#feelsLike'),
    desc: document.querySelector('#desc'),
    wind: document.querySelector('#wind'),
    ultraViolate: document.querySelector('#UV'),
    airQuality: document.querySelector('#AQI'),
    dew: document.querySelector('#dew'),
    humidity: document.querySelector('#hum'),
    cloudCover: document.querySelector('#cloudCover'),
    visibility: document.querySelector('#visibility'),
};
// fetch weatherData from Weather API (Function)
async function weatherData(city) {
    try {
        const response = await fetch(`https://api.weatherbit.io/v2.0/current?key=f44905127dd1448abfb46ab9ef132b8a&city=${city}`);
        const info = await response.json();
        return info;
    }
    catch (e) {
        ifError();
    }
}
defaultWeather();
// click event(Event Listner)
searchOperation.searchbtn.addEventListener('click', async function (e) {
    try {
        e.preventDefault();
        elementsToOutput.warning.textContent = '';
        let city = searchOperation.searchLabel.value;
        const info = await weatherData(city);
        const { uv, dewpt, temp, rh, clouds, vis, wind_cdir, wind_spd, aqi, app_temp, city_name } = info.data[0];
        const { description, icon } = info.data[0].weather;
        addHeader(city_name);
        addImage(icon);
        mainInfo(temp, app_temp, description);
        moreInfo(`${wind_cdir}` + ' ' + `${wind_spd}`, uv, aqi, dewpt, rh, clouds, vis);
        searchOperation.searchLabel.value = '';
    }
    catch (e) {
        ifError();
    }

})
function addHeader(city) {
    const { cityName } = elementsToOutput;
    cityName.textContent = city;
}
// function to add cloud icon
function addImage(icon) {
    elementsToOutput.image.setAttribute('src', `https://www.weatherbit.io/static/img/icons/${icon}.png`);
}
// information adjecent to icon
function mainInfo(temp, feel, des) {
    const { temperature, feelsLikeTemp, desc } = elementsToOutput;
    // cityName.textContent = city;
    temperature.textContent = temp;
    feelsLikeTemp.textContent = feel;
    desc.textContent = des;
}
// information in list
function moreInfo(windS, uv, aqi, dewT, humid, cloud, visi) {
    const { wind, ultraViolate, airQuality, dew, humidity, cloudCover, visibility } = elementsToOutput;
    wind.textContent = windS;
    ultraViolate.textContent = uv;
    airQuality.textContent = aqi;
    dew.textContent = dewT;
    humidity.textContent = humid;
    cloudCover.textContent = cloud;
    visibility.textContent = visi;
}

async function defaultWeather() {
    const info = await weatherData('london');
    const { uv, dewpt, temp, rh, clouds, vis, wind_cdir, wind_spd, aqi, app_temp } = info.data[0];
    const { description, icon } = info.data[0].weather;
    elementsToOutput.cityName.textContent = 'London';
    addImage(icon);
    mainInfo(temp, app_temp, description);
    moreInfo(`${wind_cdir}` + ' ' + `${wind_spd}`, uv, aqi, dewpt, rh, clouds, vis);

}
function ifError() {
    elementsToOutput.warning.textContent = 'Try again!!';
}