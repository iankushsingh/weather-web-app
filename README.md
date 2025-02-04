# Weather App

A simple weather application that allows users to check the current weather conditions for a specific location.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [How to Use](#how-to-use)
- [Contribution](#contribution)
- [API Key](#api-key)
- [License](#license)


## Demo

https://iankushsingh.github.io/weather-web-app/

![Weather App Screenshot](img/screenshot.png)

## Features

- **Real-time Weather Data:** Fetches and displays current weather information using a weather API.
- **Light Mode and Dark Mode:** Users can switch between light and dark themes for better accessibility.
- Display current weather conditions (temperature, description, etc.).
- Search for weather by location.
- Responsive design for various devices.

## Technologies Used

- HTML
- CSS
- JavaScript
- https://www.weatherapi.com/docs/
- [Weather API](https://openweathermap.org/api)
- Git and GitHub for version control

## Getting Started

To get a copy of this project up and running on your local machine, follow these steps:

1. Clone the repository:

    ```bash
    https://github.com/iankushsingh/Weather-web-app.git
    ```

2. Open the project folder:

    ```bash
    cd weather-web-app
    ```

## How to Use

1. Open the `index.html` file in a web browser.
2. Enter the desired location in the search bar.
3. Click the "Search" button to retrieve and display the weather information.

## Contribution

- Aman Gupta : Role - Project Manager 
- Aman Pandey : Game Developer ( Responisble for making Unique )
- Ankush Singh Bhadauriya : Backend Developer
- Anshika Dwivedi : Frontend Developer
- Harshit Katiyar : Quality Assurance Tester


## API Key

This project uses a weather API to fetch real-time weather data. To use the API, you need to obtain an API key by signing up on the API provider's website.

Once you have the API key, create a file named `config.js` in the root directory and add the following code:

```javascript
// config.js
const apiKey = 'cefcd70f32405f5998871bb3dff62dba';

export default apiKey;

