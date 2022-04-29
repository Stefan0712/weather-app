const display = document.querySelector(".display");
const search = document.getElementById('search-bar')
const searchBtn = document.getElementById('search-button')
const tempUnitBtn = document.getElementById('tempUnitBtn')
let loc = undefined;
function setData(){
    loc = document.getElementById('search-bar').value;
    getData(loc);
    showData();
}
async function getData(loc){
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=d8d2397a14de455eaa6135143222904&q=${loc}&aqi=no`, {mode: 'cors'});
    const geoData = await response.json();
    
    console.log(geoData)
}


function showData(){
    
}








