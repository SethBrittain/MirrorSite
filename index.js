/*
var weatherapi_key = e40f0f188a34494b8b5175137210611;

function httpGet(theUrl, params)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

console.log(httpGet())
*/

function getDate() {
    let currentDate = new Date();
    let date = [currentDate.getMonth(), currentDate.getDay(), currentDate.getFullYear()];

    for (let i = 0; i < date.length; i++) {
        console.log(date[i]);
        if (date[i].length <= 1) {
            date[i] = "0"+date[i];
        }
    }

    return date[0] + "/" + date[1] + "/" + date[2];
}

function getTime() {
    let currentDate = new Date();
    let hours = parseInt(currentDate.getHours());
    let time = [hours % 12, currentDate.getMinutes()];
    
    for (let i = 0; i < time.length; i++) {
        if (time[i].length <= 1) {
            time[i] = "0"+time[i];
        }
    }
    var suffix = hours >= 12 ? "pm" : "am";
    return(time[0] + ":" + time[1] + suffix);
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
    setInterval(function(){
        $('.time').html(getTime());
        $('.welcome-message').html(getWelcomeMessage());
        console.log("called");
    }, 1000)
})