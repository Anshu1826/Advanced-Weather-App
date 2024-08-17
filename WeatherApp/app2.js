
let api = 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=1b38fc86849cfcd3d7c5da9ed13f6b5c&units=metric';
const temp = document.querySelector('.temp')
const cityTag = document.querySelector('.city')
const btn = document.querySelector('button')
const humidity = document.querySelector('.humidityVal')
const windSpeed = document.querySelector('.windVal')
const img = document.querySelector('.main-img')
const body = document.querySelector('body')

function findImg(type) {
    if(type === 'Clear')
        return 'sun (1).png'
    else if(type === 'Clouds')
        return 'cloudy (1).png'
    else if(type === 'Rain')
        return 'rain.png'
    else if(type === 'Drizzle')
        return 'drizzle.png'
    else if(type === 'Thunderstorm')
        return 'lightning-bolt-.png'
    else if(type === 'Snow')
        return 'snow.png'
    else
    return 'fog.png'
}

btn.addEventListener('click',()=>{
    const input = document.querySelector('input');
    let city;
    if(!input.innerText) {
        city = input.value.trim().charAt(0).toUpperCase() + input.value.trim().substring(1);
    }
    api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1b38fc86849cfcd3d7c5da9ed13f6b5c&units=metric`
    console.log(api)
    fetch(api).then(response=>{
        if(!response.ok)
            throw new Error('City not found')
        return response.json();
    }).then(data=>{
        temp.innerText = data.main.temp + '° C';
        cityTag.innerText = city
        humidity.innerText = data.main.humidity +'%'
        windSpeed.innerText = data.wind.speed+'km/h'
        img.src = findImg(data.weather[0].main)

        return fetch(`https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=fhLJRLWMrx-4ioW1nzOnnq2gG15r7RbidW2o4g5_e9U`).then(response=>response.json())
    }).then(data=>{
        body.style.backgroundImage = `url('${data.results[0].urls.full}')`
        body.style.backgroundSize = 'cover'
        body.style.backgroundRepeat = 'no-repeat'
        // body.style.backgroundPosition = 'center'
    })
})