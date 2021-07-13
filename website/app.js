/* Global Variables */
// requirements - No.3
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'e3827a68bc13c3bd10b3e8bac725ec9b';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// requirements - No.3
/* beginning of async get */
//generate btn
const generateButton = document.getElementById('generate');

//event listener for generate btn
generateButton.addEventListener('click', knowZipCode);

// callback function of generate btn event listener
function knowZipCode(event) {
    // getting zip code
    const zipCodeElement = document.querySelector('#zip');
    const zipCode = zipCodeElement.value;  

    if(!zipCode) {
        alert('Please Enter Your Zipe Code!');
        return;
    }

    //getting user response
    const userResponseElement = document.querySelector('#feelings');
    const userResponse = userResponseElement.value;

    // whole url
    const url = `${baseURL}zip=${zipCode}&appid=${apiKey}`;     
    
    // requirements - No.4
    // Chaining Promises
    getWeather(url)
    .then(function (data) {
        postWeather({temp: data, date: newDate, userRes: userResponse}) 
    })
    //requirments - No.5
    .then (
        updateUI()
    );
    
}

// async get function
const getWeather = async (url) => {
    const response = await fetch (url);

    try {
        const weatherData = await response.json();
        const temperature = weatherData.main.temp;
        return temperature;

    } catch (error) {
        console.log('Error:', error);
    }
};
/* end of async get */ 

// requirements - No.4
/* beginning of async post  */
// async post function
const postWeather = async (data = {}) => {   
    const response = await fetch('/addTemp', {
        method: 'POST',
        credentials: 'same-origin', // the same port that the hosting on
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({...data})
    });

    try {
        const projData = await response.json();
        return projData;
    } catch (error) {
        console.log('Error:', error);
    }
};
/* end of async post  */


// requirements - No.5
/* beginning of update UI func */
const updateUI = async () => {
    const res = await fetch('/getData');

    try {
        const data = await res.json();
        document.getElementById('date').innerHTML = `Today: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${Math.round(data.temp)} degrees`;
        document.getElementById('content').innerHTML = `Content: ${data.userRes}`;

    } catch (error) {
        console.log('error', error);
    }
};
/* end of update UI func */