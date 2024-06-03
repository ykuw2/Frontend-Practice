// WEATHER APP

const weatherForm = document.querySelector(".weatherForm"); //we are not working with ids. We are working with classes here, so we are using querySelector. Returns the first element of this class.
const cityInput = document.querySelector(".cityInput")
const card = document.querySelector(".card")
const apikey = "2f3599af13a84d6fefd3769bd069ad93";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault(); //default behavior is refreshing the page, something we do not want to do.

    const city = cityInput.value; 

    if (city) {
        try {
            const weatherData = await getWeatherData(city); //the async function goes here
            displayWeatherInfo(weatherData);
        }
        catch(error) {
            console.log(error);
            displayError(error);
        }
    } 
    else {
        displayError("Please enter a city");
    }
}) //after we see "submit" happen, execute the second argument.

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    const response = await fetch(apiUrl);

    if (!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}
//async function is basically allowing other parts of the code run while the function is waiting its promise return. In other words, it is waiting a promise.

function displayWeatherInfo(data){
    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]}  = data; //object destructuring, using console.log(data) to see the data

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p"); 
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * 1.8 + 32).toFixed(1)}°F`; //toFixed() rounds it to a specified number of decimals
    humidityDisplay.textContent = `Humiditiy: ${humidity}%`
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay"); //adds the css format 
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId){
    switch(true) {
        case(weatherId >= 200 && weatherId < 300):
            return "⛈️";

        case(weatherId >= 300 && weatherId < 400):
            return "🌧️";
        
        case(weatherId >= 500 && weatherId < 600):
            return "🌧️";

        case(weatherId >= 600 && weatherId < 700):
            return "❄️";
        
        case(weatherId >= 700 && weatherId < 800):
            return "💨";    
        
        case(weatherId === 800):
            return "☀️";
        
        case(weatherId >=801 && weatherId < 810):
            return "☁️";
        
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay"); //adds the properties of errorDisplay into this displayError element (which is a paragraph)

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
} //displays error message