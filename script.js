const search = document.getElementById('search-bar')
const searchBtn = document.getElementById('search-button')
const forecastPanel = document.querySelector('.future');


const country = document.getElementById('country')
const locName = document.getElementById('locName')
const condition = document.getElementById('condition')
const lastUpdate = document.getElementById('last-update')
const tempC = document.getElementById('tempC')
const tempF = document.getElementById('tempF')

const feelsLikeC = document.getElementById('feels-likeC')
const feelsLikeF = document.getElementById('feels-likeF')

const windDir = document.getElementById('wind-dir')
const windSpeed = document.getElementById('wind-speed')
const precip = document.getElementById('precip')
const humid = document.getElementById('humid')
const uv = document.getElementById('uv')

let globalGeoData;
search.addEventListener('keypress',function(event){
    if(event.key=='Enter'){
        event.preventDefault();
        searchBtn.click();
    }
})


let loc = undefined;
function setData(){
    loc = document.getElementById('search-bar').value;
    getData(loc);
    
}
async function getData(loc){
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d8d2397a14de455eaa6135143222904&q=${loc}&days=5&aqi=no&alerts=no
    `, {mode: 'cors'});
    const geoData = await response.json();
    
    console.log(geoData)
    showData(geoData);
    
}


function showData(geoData){
    country.innerHTML = geoData.location.country;
    locName.innerHTML = geoData.location.region;
    condition.innerHTML = geoData.current.condition.text;
    lastUpdate.innerHTML = `Last updated ${geoData.current.last_updated}`
    tempC.innerHTML = `${geoData.current.temp_c} degrees C`;
    feelsLikeC.innerHTML = `Feels like ${geoData.current.feelslike_c}`
    tempF.innerHTML = `${geoData.current.temp_f} degrees F`;
    feelsLikeF.innerHTML = `Feels like ${geoData.current.feelslike_f}`
    windDir.innerHTML = `Wind direction: ${geoData.current.wind_dir}`
    windSpeed.innerHTML = `Wind speed: ${geoData.current.wind_kph} k/h`
    precip.innerHTML = `Precipitations: ${geoData.current.precip_mm} mm`
    humid.innerHTML = `Humidity: ${geoData.current.humidity}`
    uv.innerHTML = `UV ${geoData.current.uv}`
    let status = geoData.current.condition.text.toLowerCase();
    let isDay = geoData.current.is_day;
    
    changeBg(status, isDay)
    forecastDays(geoData);



}
function forecastDays(geoData){
    let arrLength = geoData.forecast.forecastday.length;
    for(let i=0;i<arrLength;i++){
    const dayContainer = document.createElement('div')
    dayContainer.classList.add('days')
    forecastPanel.appendChild(dayContainer)

    const currentC = document.createElement('div')
    currentC.classList.add('currentC');
    currentC.innerHTML = "Current " +geoData.forecast.forecastday[i].day.avgtemp_c + " C";
    dayContainer.appendChild(currentC);

    const currentF = document.createElement('div')
    currentF.classList.add('currentF');
    currentF.innerHTML = "Current " +geoData.forecast.forecastday[i].day.avgtemp_f + " F";
    dayContainer.appendChild(currentF);

    const minC = document.createElement('div')
    minC.classList.add('minC');
    minC.innerHTML ="Min " +geoData.forecast.forecastday[i].day.mintemp_c + " C";
    dayContainer.appendChild(minC);

    const minF = document.createElement('div')
    minF.classList.add('minF');
    minF.innerHTML = "Min "+geoData.forecast.forecastday[i].day.mintemp_f+" F";
    dayContainer.appendChild(minF);

    const maxC = document.createElement('div')
    maxC.classList.add('maxC');
    maxC.innerHTML = "Max "+ geoData.forecast.forecastday[i].day.maxtemp_c+ " C";
    dayContainer.appendChild(maxC);

    const maxF = document.createElement('div')
    maxF.classList.add('maxF');
    maxF.innerHTML ="Max "+ geoData.forecast.forecastday[i].day.maxtemp_f+" F";
    dayContainer.appendChild(maxF);

    const cond = document.createElement('div')
    cond.classList.add('cond');
    cond.innerHTML = geoData.forecast.forecastday[i].day.condition.text;
    dayContainer.appendChild(cond);


    const precip = document.createElement('div')
    precip.classList.add('precip');
    precip.innerHTML ="Precipitations: " +geoData.forecast.forecastday[i].day.totalprecip_mm+" mm";
    dayContainer.appendChild(precip);


    }
}


function changeBg(status,isDay){
    if(status.includes("cloud")){
        document.body.style.cssText = "background-image: url('imgs/cloudy.jpg')";
    }else  if(status.includes("sun")){
        document.body.style.cssText = "background-image: url('imgs/sunny.jpg')";
    }else  if(status.includes("rain")){
        document.body.style.cssText = "background-image: url('imgs/rainy.jpg')";
    }else  if(status.includes("snow")){
        document.body.style.cssText = "background-image: url('imgs/snowing.jpg')";
    }else  if(status.includes("mist")){
        document.body.style.cssText = "background-image: url('imgs/mist.jpg')";
    }else  if(status.includes("clear")){
        
        if(isDay==1){
        document.body.style.cssText = "background-image: url('imgs/day.jpg')";
        }else if(isDay==0){
            document.body.style.cssText = "background-image: url('imgs/night.jpg')";    
        }
    }
}




