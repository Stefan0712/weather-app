const search = document.getElementById('search-bar')
const searchBtn = document.getElementById('search-button')
const forecastPanel = document.querySelector('.future');
const mainContainer = document.body
const inputs = document.querySelector('.inputs')
const initialMenu = document.querySelector('.initialMenu')


const country = document.getElementById('country')
const locName = document.getElementById('locName')
const condition = document.getElementById('condition')
const lastUpdate = document.getElementById('last-update')
const temp = document.getElementById('temp')

const feelsLike = document.getElementById('feels-like')

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
let firstRun = true;
function setData(){
    if(firstRun==true){
        firstRun=false;
        initialMenu.style.cssText = "display: none"
        inputs.appendChild(search)
        inputs.appendChild(searchBtn)
    }
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
    //country.innerHTML = geoData.location.country;
    locName.innerHTML = geoData.location.country+", "+geoData.location.region;
    condition.innerHTML = geoData.current.condition.text;
    lastUpdate.innerHTML = `Last updated ${geoData.current.last_updated}`
    temp.innerHTML = `${geoData.current.temp_c} °C`;
    feelsLike.innerHTML = `Feels like ${geoData.current.feelslike_c} °C`
    
    windDir.innerHTML = `Wind direction: ${geoData.current.wind_dir}`
    windSpeed.innerHTML = `Wind speed: ${geoData.current.wind_kph} k/h`
    precip.innerHTML = `Precipitations: ${geoData.current.precip_mm} mm`
    humid.innerHTML = `Humidity: ${geoData.current.humidity}`
    uv.innerHTML = `UV ${geoData.current.uv}`
    let status = geoData.current.condition.text.toLowerCase();
    let isDay = geoData.current.is_day;
    globalGeoData = geoData
    
    changeBg(status, isDay)
    forecastDays(geoData);
    winDir();



}
function forecastDays(geoData){
    if(document.querySelector('.days')!=null){
        document.querySelector(".future").remove();
        const newFuture = document.createElement('div')
        newFuture.classList.add("future")
        document.querySelector('.main').appendChild(newFuture)
    }

    let arrLength = geoData.forecast.forecastday.length;
    for(let i=0;i<arrLength;i++){
    const dayContainer = document.createElement('div')
    dayContainer.classList.add('days')
    document.querySelector('.future').appendChild(dayContainer)


    const date = document.createElement('div')
    date.classList.add('date')
    date.innerHTML = geoData.forecast.forecastday[i].date;
    dayContainer.appendChild(date)
    
    const currentC = document.createElement('div')
    currentC.classList.add('currentC');
    currentC.innerHTML = "Current " +geoData.forecast.forecastday[i].day.avgtemp_c + " °C";
    dayContainer.appendChild(currentC);

    const currentF = document.createElement('div')
    currentF.classList.add('currentF');
    currentF.innerHTML = "Current " +geoData.forecast.forecastday[i].day.avgtemp_f + " F";
    dayContainer.appendChild(currentF);

    const minC = document.createElement('div')
    minC.classList.add('minC');
    minC.innerHTML ="Min " +geoData.forecast.forecastday[i].day.mintemp_c + " °C";
    dayContainer.appendChild(minC);

    const minF = document.createElement('div')
    minF.classList.add('minF');
    minF.innerHTML = "Min "+geoData.forecast.forecastday[i].day.mintemp_f+" F";
    dayContainer.appendChild(minF);

    const maxC = document.createElement('div')
    maxC.classList.add('maxC');
    maxC.innerHTML = "Max "+ geoData.forecast.forecastday[i].day.maxtemp_c+ " °C";
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

        if(i>=0 && i<arrLength-1){
            const bar = document.createElement('div')
            bar.classList.add('bar')
            document.querySelector('.future').appendChild(bar)
            
        }

    }
}


function changeBg(status,isDay){
    const condIcon = document.getElementById('condIcon');
    if(status.includes("cloud")){
        condIcon.setAttribute('src','./imgs/cloudIcon.svg')
        mainContainer.style.cssText = "background-image: url('imgs/cloudy.jpg')";
    }else  if(status.includes("sun")){
        condIcon.setAttribute('src','./imgs/sunIcon.svg')
        mainContainer.style.cssText = "background-image: url('imgs/sunny.jpg')";
    }else  if(status.includes("rain")){
        condIcon.setAttribute('src','./imgs/rainycloudIcon.svg')
        mainContainer.style.cssText = "background-image: url('imgs/rainy.jpg')";
    }else  if(status.includes("snow")){
        condIcon.setAttribute('src','./imgs/snowIcon.svg')
        mainContainer.style.cssText = "background-image: url('imgs/snowing.jpg')";
    }else  if(status.includes("mist")){
        condIcon.setAttribute('src','./imgs/mistIcon.svg')
        mainContainer.style.cssText = "background-image: url('imgs/mist.jpg')";
    }else  if(status.includes("clear")){
        
        if(isDay==1){
            condIcon.setAttribute('src','./imgs/sun.svg')
            mainContainer.style.cssText = "background-image: url('imgs/day.jpg')";
        }else if(isDay==0){
            condIcon.setAttribute('src','./imgs/moonIcon.svg')
            mainContainer.style.cssText = "background-image: url('imgs/night.jpg')";    
        }
    }
}

function winDir(){
    const arrow = document.getElementById('arrow')
    let windDirection = globalGeoData.current.wind_dir;
    switch(windDirection){
        case 'N':
            arrow.style.cssText = 'transform: rotate(0deg);';
            break;
        case 'NW':
            arrow.style.cssText = 'transform: rotate(45deg);';
            break;
        case 'W':
            arrow.style.cssText = 'transform: rotate(90deg);';
            break; 
        case 'SW':
            arrow.style.cssText = 'transform: rotate(135deg);';
            break;
        case 'S':
            arrow.style.cssText = 'transform: rotate(180deg);';
            break;
        case 'SE':
            arrow.style.cssText = 'transform: rotate(-135deg);';
            break; 
        case 'E':
            arrow.style.cssText = 'transform: rotate(-90deg);';
            break;
        case 'NE':
            arrow.style.cssText = 'transform: rotate(-45deg);';
            break;  
        
    }
}


