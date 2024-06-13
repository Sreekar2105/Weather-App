let actualUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/kurnool?unitGroup=metric&key=QXDQL8S9DBMJNY6445UTQUJNM&contentType=json";

let input = document.querySelector(".search-city input");
let search = document.querySelector("button");
let temperature = document.querySelector(".temp");
let humidity = document.querySelector("#percent");
let windSpeed = document.querySelector("#windSpeed");
let container1 = document.querySelector(".container");
let container2 = document.querySelector(".container2");
let img = document.querySelector(".weather-logo img");
let msg = document.querySelector(".error");

search.addEventListener("click", async (e) => {
  let cityName = input.value;
  console.log(cityName);
  let city = document.querySelector(".city");
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=QXDQL8S9DBMJNY6445UTQUJNM&contentType=json`;


  let response = await fetch(url);
  console.log(response);

  if(response.status == "400")
  {
    input.value = "";
    msg.style.display = "block";
    container1.style.height = "150px";
    container2.style.display = "none";
  }

  else
 {
      msg.style.display = "none";
      container2.style.display = "block";
      container1.style.height = "650px";
      let res = await response.json();
      console.log(res);
      city.innerText = cityName.charAt(0).toUpperCase() + cityName.slice(1);
      let weather = res.currentConditions;
      console.log(weather);
      temperature.innerText = Math.round(weather.temp) + "°c";
      humidity.innerText = Math.round(weather.humidity) + "%";
      windSpeed.innerText = Math.round(weather.windspeed) + " km/h";
      if (weather.conditions == "Partially cloudy") {
         img.src = "./images/mist.png";
       } else if (weather.conditions == "Overcast") {
         img.src = "./images/clouds.png";
       } else if (weather.conditions == "Snow") {
         img.src = "./images/snow.png";
       } else if (weather.conditions == "Rain" && weather.conditions == "Overcast") {
         img.src = "./images/rain.png";
       } else if (weather.conditions == "Clear") {
         img.src = "./images/clear.png";
       }
   }

});
