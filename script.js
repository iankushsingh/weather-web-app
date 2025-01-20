let show = document.getElementById("show");
let search = document.getElementById("search");
let cityVal = document.getElementById("userlocation");
const toggleSwitch = document.getElementById('toggleSwitch');
const status = document.getElementById('status');
let cel;
let far;
let feels;
//Make sure you have your own key.
let key = "cefcd70f32405f5998871bb3dff62dba";

let getWeather = () => {
    show.innerHTML="";
    let cityValue = cityVal.value;
    if (cityValue.length == 0) {
        //show.innerHTML += `<h3 class="error">Please enter a city name</h3>`;
    }
    else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
        cityVal.value = "";
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                
                display(data)
                // Define the API URL and your API key
const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=47859880165afc92bc8046dea1b72b82`;
/*https://api.openweathermap.org/data/2.5/onecall?lat=26.4667&lon=80.35&appid=cefcd70f32405f5998871bb3dff62dba
 80.35 26.4667   */       
// Fetch the weather data from the OpenWeatherMap API
fetch(apiURL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // Parse the response as JSON
  })
  .then(forecastData => {
    const dt = new Date(); 
    let prev = dt.getDate()-1;
    //for traversing each day data
    for(let i=0;i<40;i+=8)
    {
        let count=7;
        let min=forecastData.list[i].main.temp_min;
        let max=forecastData.list[0].main.temp_max;
        //treverse in a particular day 8 time to to find minimum and maximum temperature 
        while(count >= 0)
        {
            min = Math.min(min,forecastData.list[i+count].main.temp_min)
            max = Math.max(max,forecastData.list[i+count].main.temp_max)
            count --;
        }
        const dateTime = new Date(forecastData.list[i].dt * 1000);
        // Convert Unix timestamp to Date object

      // Extract the weekday, month, date
      const weekday = dateTime.toLocaleString('en-US', { weekday: 'long' });
      const month = dateTime.toLocaleString('en-US', { month: 'long' });
      const date = dateTime.getDate();
      // Extract the weather icon, description, min, and max temperature
      const icon = forecastData.list[i].weather[0].icon;
      const description = forecastData.list[i].weather[0].description;
      // Display the information
      show.innerHTML += ` <div class="try mode">
                    <div class="this-date">
                        ${weekday}, ${month} ${date}
                    </div>
                    <img src="https://openweathermap.org/img/wn/${icon.substring(0,2)}d@2x.png" alt="img"> 
                    <div class="this-des">
                        ${description}
                    </div>
                    <div class="this-temp">
                        ${(min-273.15).toFixed(2)}°C  / ${(max-273.15).toFixed(2)}°C
                    </div>
                </div>`; 
    // Get the computed style
    let Color = window.getComputedStyle(document.querySelector(".mode"));

    //Log the background color
    console.log("bg color is:",Color.backgroundColor,Color.color);
        let elements = document.getElementsByClassName('mode');
        let lastElement = elements[elements.length - 1];
        lastElement.style.backgroundColor=Color.backgroundColor;
        lastElement.style.color=Color.color;
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
            })
            .catch(() => {
                //removing outputs
                document.querySelector(".weatherIcon").innerText="";
                document.querySelector(".temperature").innerText="";
                document.querySelector(".feelslike").innerText="";
                document.querySelector(".date").innerText="";
                document.querySelector(".city").innerText="";
                
                show.innerHTML = `<h3 class="error">City not found</h3>`;
                //making Highlighting null
                HValue.innerText="--";
                WValue.innerText="--"; 
                SRValue.innerText="--";
                SSValue.innerText="--";
                CValue.innerText="--";
                UVValue.innerText="--";
                PValue.innerText="--";
            });
    }
};
function display(data)
{
    //adding icon
    document.querySelector(".weatherIcon").innerHTML=`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"><div class="description"></div>`;
    // temprature
    cel = data.main.temp;
    far = (cel * 9/5)+32;
    feels = data.main.feels_like;
    if(Fahrenheit.style.backgroundColor == "lightgreen")
    {
        document.querySelector(".temperature").innerHTML=`<b>${far.toFixed(2)} °F`;
        // feels like temprature 
        document.querySelector(".feelslike").innerText=`Feels like ${((feels *9/5)+32).toFixed(2)} °F`
    }
    else
    {
        document.querySelector(".temperature").innerHTML=`<b>${cel} °C`;
        // feels like temprature 
        document.querySelector(".feelslike").innerText=`Feels like ${data.main.feels_like} °C`
    }
    // description 
    document.querySelector(".description").innerHTML=`${data.weather[0].description}`;
    // Create a new Date object for the current date and time
    const date = new Date();

    // Get the day of the week
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = daysOfWeek[date.getDay()];

    // Get the month
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = months[date.getMonth()];

    // Get the current date
    const currentDate = date.getDate();

    // Format the time as HH:MM
    const currentHours = date.getHours().toString().padStart(2, '0');
    const currentMinutes = date.getMinutes().toString().padStart(2, '0');
    const currentTime = `${currentHours}:${currentMinutes}`;

    //date
    document.querySelector(".date").innerText=`${currentDay}, ${currentMonth} ${currentDate} at ${currentTime} ${date.getHours() <= 12 ? "A.M":"P.M"}`;
    
    //city
    document.querySelector(".city").innerText=`${data.name} ${data.sys.country}`
    
    //Humidity
    HValue.innerText=`${data.main.humidity}%`;
    
    //Wind speed
    WValue.innerText=`${data.wind.speed}m/s`;
    
    // Sunset time in Unix format

    // Convert Unix timestamps to local time
    const sunriseDate = new Date(data.sys.sunrise * 1000);
    const sunsetDate = new Date(data.sys.sunset * 1000);
    
    //Sunrise
    const sunrise = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    SRValue.innerText=`${sunrise}`;
   
    //Sunset
    const sunset = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    SSValue.innerText=`${sunset}`;
    
    //Coudy 
    CValue.innerText=`${data.clouds.all}%`;
    
    //UV index
    UVValue.innerText="NIL"
    
    //Pressure 
    PValue.innerText=`${data.main.pressure}hPa`
}

search.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
Celsius.addEventListener("click",()=>{
    Celsius.style.backgroundColor = "lightgreen";
    Fahrenheit.style.backgroundColor = "white";
    if(cel != undefined)
    {
        document.querySelector(".temperature").innerHTML=`<b>${cel} °C`;
        // feels like temprature 
        document.querySelector(".feelslike").innerText=`Feels like ${feels} °C`
    }
})
Fahrenheit.addEventListener("click",()=>{
    Celsius.style.backgroundColor = "white";
    Fahrenheit.style.backgroundColor = "lightgreen";
    if(far != undefined)
    {
        document.querySelector(".temperature").innerHTML=`<b>${far.toFixed(2)} °F`;
        // feels like temprature 
        document.querySelector(".feelslike").innerText=`Feels like ${((feels *9/5)+32).toFixed(2)} °F`
    }
})

// Add event listener to the toggle between light and dark mode
toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        changeMode("#1A2938","#1A1A1A","#F5F5F5")
        status.textContent = 'Dark mode';
    } else {
        changeMode("#ADD8E6","white","black")
        status.textContent = 'Light mode';
    }
});

// function to switch between dark mode and light mode
function changeMode(bg1,bg2,textColor)
{
    let inp = document.getElementsByClassName("mode")
    let inp2 = document.querySelector(".mode2")
    for (let i=0;i<inp.length;i++) 
    {
        inp[i].style.backgroundColor = bg1;
        inp[i].style.color = textColor;
    }
    inp2.style.backgroundColor=bg2;
    inp2.style.color=textColor;
}