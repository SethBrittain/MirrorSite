var currentWeather = {};

const WEATHER_API_HEADERS = {
    // I know this is bad practice, but this is just for demonstration purposes
    key: 'a92deb9ddb2c4944aa7175509210611'
}
const WEATHER_API_BASE_URL = "http://api.weatherapi.com/v1";
const CURRENT_WEATHER = WEATHER_API_BASE_URL + "/current.json?q=66502";

function printWeather() {
    axios.get(CURRENT_WEATHER, { headers: WEATHER_API_HEADERS })
    // Handle a successful response from the server
    .then(response => {
            // Getting a data object from response that contains the necessary data from the server
            currentWeather = response.data;
            console.log('data', currentWeather);
            
            /* temp range:
            < 50 cold
            < 80 warm
            >= 80 hot
            */
           let temp = currentWeather.current.temp_f
            if (temp < 50) {
                $('#weather-icon').html('ac unit');
            } else if (temp < 80) {
                $('#weather-icon').html('air');
            } else {
                $('#weather-icon').html('whatshot');
            }
            $('.temp-degrees').html(temp+"°F&nbsp;");
    })
    // Catch and print errors if any
    .catch(error => console.error('On create student error', error));
}

function getDate() {
    let currentDate = new Date();
    let date = [(parseInt(currentDate.getMonth())+1).toString(), (currentDate.getDate()).toString(), (currentDate.getFullYear()).toString()];

    console.log(date);
    for (let i = 0; i < date.length; i++) {
        console.log(date[i].length);
        if (date[i].length <= 1) {
            date[i] = "0"+date[i];
        }
    }


    return date[0] + "/" + date[1] + "/" + date[2];
}

function getTime() {
    let currentDate = new Date();
    let hours = parseInt(currentDate.getHours());
    
    // Update date
    if (hours == 0) {
        $('.date').html(getDate());
    }

    let time = [(hours % 12).toString(), currentDate.getMinutes().toString(), currentDate.getSeconds().toString()];
    
    for (let i = 0; i < time.length; i++) {
        if (time[i].length <= 1) {
            time[i] = "0"+time[i];
        }
    }

    // Get am/pm
    var suffix = hours >= 12 ? "pm" : "am";

    $('.welcome-message').html(getWelcomeMessage());
    return(time[0] + ":" + time[1] + ":" + time[2] + suffix);
}

function getWelcomeMessage() {
    let date = new Date();
    let hours = parseInt(date.getHours());
    if (hours >= 18) {
        return "Good Evening :)";
    } else if (hours >= 12) {
        return "Good Afternoon :)";
    } else {
        return "Good Morning :)";
    }
}

$(document).ready(function(){
    $('.date').html(getDate());
    $('.time').html(getTime())
    printWeather()
    setInterval(function(){
        $('.time').html(getTime());
    }, 1000)
    
    setInterval(function(){
        printWeather();
    }, 3600000)
})