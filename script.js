// Variable Identifier
const userlocation = document.getElementById("userlocation"),
  converter = document.getElementById("converter"),
  weatherIcon = document.querySelector(".weatherIcon"),
  temperature = document.querySelector(".temperature"),
  feelsLike = document.querySelector(". feelslike"),
  description = document.querySelector(".description"),
  date = document.querySelector(".date"),
  city = document.querySelector(".city"),
  HValue = document.getElementById("HValue"),
  WValue = document.getElementById("WValue"),
  SRValue = document.getElementById("SRValue"),
  SSValue = document.getElementById("SSValue"),
  CValue = document.getElementById("CValue"),
  UVValue = document.getElementById("UVValue"),
  PValue = document.getElementById("PValue"),
  Forecast = document.querySelector(".Forecast"),
  search = document.getElementById("search"); // Added search variable

const key = "cefcd70f32405f5998871bb3dff62dba";
const WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&q=`;
const WEATHER_DATA_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?appid=${key}&exclude=minutely&units=metric&`;

// Function Declaration
function finduserlocation() {
  Forecast.innerHTML = "";
  fetch(WEATHER_API_ENDPOINT + userlocation.value)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod != 200) {
        alert(data.message);
        return;
      }
      console.log(data);

      city.innerHTML = data.name + "," + data.sys.country;
      weatherIcon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;

      fetch(
        `${WEATHER_DATA_ENDPOINT}lat=${data.coord.lat}&lon=${data.coord.lon}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          temperature.innerHTML = TempConverter(data.current.temp);
          feelsLike.innerHTML = "Feels like: " + TempConverter(data.current.feels_like);
          description.innerHTML = '<i class="fa-brands fa-cloudversify"></i> &nbsp;' + data.current.weather[0].description;

          const options1 = {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          };

          date.innerHTML = getLongFormatDateTime(data.current.dt, data.timezone_offset, options1);
          HValue.innerHTML = Math.round(data.current.humidity) + "<span>%</span>";
          WValue.innerHTML = Math.round(data.current.wind_speed) + "<span> km/h</span>";
          SRValue.innerHTML = getLongFormatDateTime(data.current.sunrise, data.timezone_offset, options1);
          SSValue.innerHTML = getLongFormatDateTime(data.current.sunset, data.timezone_offset, options1);
          CValue.innerHTML = data.current.clouds + "<span>%</span>";
          UVValue.innerHTML = data.current.uvi;
          PValue.innerHTML = data.current.pressure + "<span> hPa</span>";

          data.daily.forEach((weather) => {
            let div = document.createElement("div");

            const options = {
              weekday: "long",
              month: "long",
              day: "numeric",
            };
            let daily = getLongFormatDateTime(weather.dt, 0, options).split(" at ");

            div.innerHTML = daily[0];
            div.innerHTML += `<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" />`;
            div.innerHTML += `<p class="forcast-desc">${weather.weather[0].description}</p>`;
            div.innerHTML += `<span><span>${TempConverter(weather.temp.min)}</span>&nbsp;&nbsp;<span>${TempConverter(weather.temp.max)}</span></span>`;

            Forecast.append(div);
          });
        });
    });
}

function formatUnixTime(dtValue, offset, options = {}) {
  const date = new Date((dtValue + offset) * 1000);
  return date.toLocaleTimeString([], { timeZone: "UTC", ...options });
}

function getLongFormatDateTime(dtValue, offset, options) {
  return formatUnixTime(dtValue, offset, options);
}

function TempConverter(temp) {
  let tempvalue = Math.round(temp);
  let message = "";
  if (converter.value == "°C") {
    message = tempvalue + "<span>°C</span>";
  } else {
    let ctof = (tempvalue * 9) / 5 + 32;
    message = ctof + "<span>°F</span>";
  }
  return message;
}

// Event Listener for Search Icon
search.addEventListener("click", finduserlocation);
window .addEventListener("load", () => {
  userlocation.value = ""; // Clear input on load
});
