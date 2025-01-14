// Variable Identifier
const userlocation = document.getElementById("userlocation"),

// console.log(userlocation)

coverter=document.getElementById("converter"),
weatherIcon=document.querySelector(".weatherIcon"),
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
UVValue = document.getElementById("UVValue"),
PValue = document.getElementById("PValue");

WEATHER_API_ENDPOINT="http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=cefcd70f32405f5998871bb3dff62dba&q=";
WEATHER_DATA_ENDPOINT=''

Forecast = DocumentTimeline.querySelector(".Forecast");
// Function Declaration
function findUserLocation() {
  fetch(WEATHER_API_ENDPOINT + "London")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
}
