const weather=document.querySelector(".js-weather");

const API_KEY="8ebbe92c8f3009daf2cd3f574882eea7";
const COORDS="coords";

function getWeather(latitude,longitude){
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`).then(function(response){
    console.log(response);
    return response.json();
})
.then(function(json){
    const temperature=json.main.temp;
    const place=json.name;
    weather.innerText=`${temperature} @${place}`
});
}

function saveCoords(coordsObj){
localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    console.log(latitude,longitude);
    const coordsObj={
       latitude:latitude,
        longitude:longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError(){
    console.log("Cant access Geo location")
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
    const loadedCoords=localStorage.getItem(COORDS);
    if(loadedCoords===null){
        askForCoords();
    }
    else{
        //getWeather
        const parsedCoords=JSON.parse(loadedCoords);
        console.log(parsedCoords.latitude)
        getWeather(parsedCoords.latitude,parsedCoords.longitude);

    }
}

function init(){
    loadCoords();
}

init();