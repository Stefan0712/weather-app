const searchBar = document.getElementById('search-bar')
const searchBtn = document.getElementById('search-btn')
const forecastPanel = document.querySelector('.future');
const mainContainer = document.querySelector('.main')
const backgroundImg = document.getElementById('background-image')
const background = document.querySelector('.background')
//today-card
//current-date
const dateNow = document.getElementById('date-now')
//temperature
const temp = document.getElementById('temp')
//location
const locationName = document.getElementById('location-name')


const dayTime = document.getElementById('day-time')
//general info - general weather
const condition = document.getElementById('condition')



//more info
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const precip = document.getElementById('precipitation')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')
const wind_dir = document.getElementById('wind-dir')
const feels_like = document.getElementById('feels-like')
const uv = document.getElementById('uv')





let firstRun = true;
let isLoading = false;
const search = () =>{
    getData(searchBar.value)
    if(!firstRun){
        isLoading = true;
        document.querySelector('.loading-screen').classList.add('show-loading')
        document.getElementById('loading-icon').classList.add('animate-loading')
    }
}
async function getData(loc){
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d8d2397a14de455eaa6135143222904&q=${loc}&days=7&aqi=no&alerts=no
    `, {mode: 'cors'});
    const geoData = await response.json();
    
    console.log(geoData)
    showData(geoData);
    if(firstRun){
        document.querySelector('.main').classList.add('show')
        document.querySelector('.search').classList.remove('firstRun')
        firstRun = false;
    }
    
    
}


function showData(geoData){
    //general info - location
    locationName.innerHTML = `${geoData.location.region}, ${geoData.location.country}`
    
    //general info - general weather
    temp.innerHTML = `${geoData.current.temp_c} °C`
    feels_like.innerHTML = geoData.current.feelslike_c + ' °C'
    let date = new Date()
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date();
    let dayOfWeek = weekday[d.getDay()];
    let month = monthNames[date.getMonth()]
    dateNow.innerHTML = `${dayOfWeek}, ${date.getDay()} ${month}`
    

    //more info
    sunrise.innerHTML = geoData.forecast.forecastday[0].astro.sunrise
    sunset.innerHTML = geoData.forecast.forecastday[0].astro.sunset
    humidity.innerHTML = geoData.forecast.forecastday[0].day.totalprecip_mm
    humidity.innerHTML = geoData.current.humidity
    wind.innerHTML = geoData.current.wind_kph
    wind_dir.innerHTML = geoData.current.wind_dir
    feels_like.innerHTML = geoData.current.feelslike_c + ' °C'
    uv.innerHTML = geoData.current.uv

    //other
    precip.innerHTML = `Precipitations: ${geoData.current.precip_mm} mm`
    humidity.innerHTML = `Humidity: ${geoData.current.humidity}`
    uv.innerHTML = `UV ${geoData.current.uv}`
    
    forecastDays(geoData);
    if(isLoading){
        document.querySelector('.loading-screen').classList.remove('show-loading')
        document.getElementById('loading-icon').classList.remove('animate-loading')
    }
    updateStatusIcon(geoData.current.condition.text)
    changeWindArrow(geoData.current.wind_dir)
}

function forecastDays(geoData){
    if(document.querySelector('.days')!=null){
        document.querySelector(".future").remove();
        const newFuture = document.createElement('div')
        newFuture.classList.add("future")
        document.querySelector('.general-info').appendChild(newFuture)
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
    currentC.innerHTML = `${geoData.forecast.forecastday[i].day.avgtemp_c} °C`;
    dayContainer.appendChild(currentC);

    const minC = document.createElement('div')
    minC.classList.add('tempC');
    minC.innerHTML =`${geoData.forecast.forecastday[i].day.mintemp_c}/${geoData.forecast.forecastday[i].day.maxtemp_c} °C`;
    dayContainer.appendChild(minC);

    const cond = document.createElement('div')
    cond.classList.add('cond');
    cond.innerHTML = geoData.forecast.forecastday[i].day.condition.text;
    dayContainer.appendChild(cond);
}




}
const updateStatusIcon = (status) =>{

    const weatherIcon = document.getElementById('weather-status-icon')
    switch(status){
        case 'Sunny':
            weatherIcon.setAttribute('src','imgs/sunny.png')
            mainContainer.setAttribute('background-image','url("imgs/sunny-bg.jpg")')
            break
        case 'Partly cloudy':
            weatherIcon.setAttribute('src','imgs/cloud.png')
            document.body.setAttribute('src','imgs/cloudy-bg.jpg')
            break
        case 'Rainy':
            weatherIcon.setAttribute('src','imgs/rainy.png')
            document.body.setAttribute('src','imgs/rainy-bg.jpg')
            break
        default:
            weatherIcon.setAttribute('src','imgs/sunny.png')
            document.body.setAttribute('src','imgs/sunny-bg.jpg')
            break
    
    }
}
const changeWindArrow = (direction) =>{
    let degrees = 0;
    switch(direction){
        case "N":
            degrees = 0;
            break;
        case "N-E":
            degrees = 45;
            break;
        case "E":
            degrees = 90;
            break;
        case "S-E":
            degrees = 135;
            break;
        case "S":
            degrees = 180;
            break;
        case "S-W":
            degrees = 225;
            break;
        case "W":
            degrees = 270;
            break;
        case "N-W":
            degrees = 315;
            break
        default:
            degrees = 0;
            break;
    }
    
    document.getElementById('wind-dir-icon').style.cssText = `transform: rotate(${degrees}deg)`
}