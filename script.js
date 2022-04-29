const display = document.querySelector(".display");
const search = document.getElementById('search-bar')
const searchBtn = document.getElementById('search-button')
const tempUnitBtn = document.getElementById('tempUnitBtn')
const unitBtn = document.getElementById('unit')


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
let f_temp;
let c_temp;
let km_speed;
let m_speed;


let loc = undefined;
function setData(){
    loc = document.getElementById('search-bar').value;
    getData(loc);
    
}
async function getData(loc){
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=d8d2397a14de455eaa6135143222904&q=${loc}&aqi=no`, {mode: 'cors'});
    const geoData = await response.json();
    
    console.log(geoData)
    showData(geoData);
    
}


function showData(geoData){
    country.innerHTML = geoData.location.country;
    locName.innerHTML = geoData.location.region;
    condition.innerHTML = geoData.current.condition.text;
    lastUpdate.innerHTML = `Last updated ${geoData.current.last_updated}`
    temp.innerHTML = `${geoData.current.temp_c} degrees C`;
    feelsLike.innerHTML = `Feels like ${geoData.current.feelslike_c}`
    windDir.innerHTML = `Wind direction: ${geoData.current.wind_dir}`
    windSpeed.innerHTML = `Wind speed: ${geoData.current.wind_kph} k/h`
    precip.innerHTML = `Precipitations: ${geoData.current.precip_mm} mm`
    humid.innerHTML = `Humidity: ${geoData.current.humidity}`
    uv.innerHTML = `UV ${geoData.current.uv}`
    f_temp = geoData.current.temp_f;
    c_temp = geoData.current.temp_c;
    km_speed = geoData.current.wind_kph;
    m_speed = geoData.current.wind_mph;
    changeBg(geoData.current.condition.text)



}




function changeTempUnit(){
    if(tempUnitBtn.innerHTML === 'Celsius'){
        tempUnitBtn.innerHTML = "Farenheit";
        temp.innerHTML = `${f_temp} degrees F`;
    } else if(tempUnitBtn.innerHTML === 'Farenheit'){
        tempUnitBtn.innerHTML = "Celsius";
        temp.innerHTML = `${c_temp} degrees C`;
    }

}
function changeUnit(){
    if(unitBtn.innerHTML == 'Miles'){
        unitBtn.innerHTML = "KM";
        windSpeed.innerText = `Wind speed: ${m_speed} mph`
    } else if(unitBtn.innerHTML == 'KM'){
        unitBtn.innerHTML = "Miles";
        windSpeed.innerText = `Wind speed: ${km_speed} k/h`
    }

}
function changeBg(status){
    if(status.includes("cloud")){
        document.body.style.cssText = "background-image: url('imgs/cloudy.jpg')";
    }
}




