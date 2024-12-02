const userLocation = document.getElementById("userLocation"),
converter = document.getElementById("converter"),
weatherIcon = document.querySelector(".weatherIcon"),
temperature = document.querySelector(".temperature"),
feelsLike = document.querySelector(".feelsLike"),
description = document.querySelector(".description"),
date = document.querySelector(".date"),
city = document.querySelector(".city"),
HValue = document.getElementById("HValue"),
WValue = document.getElementById("WValue"),
SRValue = document.getElementById("SRValue"),
SSValue = document.getElementById("SSValue"),
CValue = document.getElementById("CValue"),
UValue = document.getElementById("UValue"),
PValue = document.getElementById("PValue"),
Forecast = document.querySelector(".Forecast");

WEATHER_API_ENDPOINT='https://api.openweathermap.org/data/2.5/weather?appid=bd6899e9bfbc7a4501b0c03907dc7005&q=';
WEATHER_DATA_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall?appid=bd6899e9bfbc7a4501b0c03907dc7005&exclude=minutely&units=metric&';

function finduserLocation(){
     fetch(WEATHER_API_ENDPOINT+ userLocation.value)
     .then((response) => response.json())
     .then((data) => {
        if(data.cod!=200){
          alert(data.message);
          return;    
        }
        console.log(data);
        city.innerHTML = data.name+","+data.sys.country;
        weatherIcon.style.background=`url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`
        temperature.innerHTML = "Temperature " + TemConverter(data.main.temp);
        feelsLike.innerHTML= "Feels Like " + TemConverter(data.main.feels_like);
        description.innerHTML=`<i class="fa-brands fa-cloudversify"></i> &nbsp;` + data.weather[0].description;
        
        const options={
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true
        };
        date.innerHTML = getLongFormatDateTime(
          data.dt, 
          data.timezone,
          options
        
        );

        HValue.innerHTML=Math.round(data.main.humidity)+"<span>%</span>";
        CValue.innerHTML=Math.round(data.clouds.all) +"<span>%</span>";
        PValue.innerHTML=Math.round(data.main.pressure) +"<span>hPa</span>";
        WValue.innerHTML=Math.round(data.wind.speed) + "<span>m/s</span>";

       const options1 = {
        hour:"numeric",
        minute:"numeric",
        hour12: true,
       };
        
       
      const options2 = { hour: "numeric", minute: "numeric", hour12: true };
      SRValue.innerHTML = getLongFormatDateTime(data.sys.sunrise, 0, options2);
      SSValue.innerHTML = getLongFormatDateTime(data.sys.sunset, 0, options2);
       
        if (data.main && data.main.uvi) {
          UValue.innerHTML = Math.round(data.main.uvi) + "<span>m/s</span>";
        } else {
          UValue.innerHTML = "No UV data available";
        }
        
        

        //fetch(
           // WEATHER_DATA_ENDPOINT  + `lon=${data.coord.lon}&lat=${data.coord.lat}`
           // )      
         ///.then((response) => response.json())
         //.then((data)=> {
        //console.log(data);
         
        
  //      });
    });
} 




function formatUnixTime(dtValue, offSet, options ={} ) {
  const date = new Date((dtValue + offSet) * 1000);
  return date.toLocaleTimeString([], { timeZone: "UTC", ...options });
}

function getLongFormatDateTime(dtValue, offSet, options) {
  return formatUnixTime(dtValue, offSet, options);
}

function TemConverter(temp) {

  let tempValue = Math.round(temp);
  let message = "";
  if (converter.value == "°C") {
    let ktoc = Math.round((tempValue - 273.15));
    message = ktoc + "<span>" + "\xB0C</span>";
  } else {
    let ktof = Math.round((tempValue - 273.15) * 9/5 + 32);
    message = ktof + "<span>" + "\xB0F</span>";
  }
  return message;
  }


