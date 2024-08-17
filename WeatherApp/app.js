
let api = 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=1b38fc86849cfcd3d7c5da9ed13f6b5c&units=metric';
const temp = document.querySelector('.temp')
const cityTag = document.querySelector('.city')
const btn = document.querySelector('button')
const humidity = document.querySelector('.humidityVal')
const windSpeed = document.querySelector('.windVal')
const img = document.querySelector('.main-img')
const body = document.querySelector('body')
let myData;

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
        myData = data
        return fetch(`https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=fhLJRLWMrx-4ioW1nzOnnq2gG15r7RbidW2o4g5_e9U`).then(response=>response.json())
    }).then(data=>{
        body.style.backgroundImage = `url('${data.results[0].urls.full}')`
        body.style.backgroundSize = 'cover'
        body.style.backgroundRepeat = 'no-repeat'
        // body.style.backgroundPosition = 'center'
    })
})

const adv = document.querySelector('.adv')
let flag = false
adv.addEventListener('click',()=>{
    if(!flag){
    const newel = document.createElement('div')
    newel.classList.add('newel')
    newel.append(plot())
    const cross = document.createElement('div')
    cross.innerText = 'X'
    newel.appendChild(cross)
    cross.classList.add('cross')
    body.appendChild(newel)
    cross.addEventListener('click',()=>{body.removeChild(newel);flag = false})
    } 
    flag = true
})




// UPlot works

function plot() {
    const div = document.createElement('div')
    div.style.width='70vw'
    div.style.height='70vh'
    div.style.fontFamily = 'Moderustic'
    div.style.background = 'background: linear-gradient(135deg #3245ff #3245cc)';
    const x = [1]; // X-axis labels
    const y1 = [myData.main.temp]; // Temperature data
    const y2 = [myData.main.feels_like]; // Feels Like data
    const y3 = [myData.main.temp_min]; // Min Temp data
    const y4 = [myData.main.temp_max]; // Max Temp data
    const y5 = [myData.main.pressure]; // Pressure data
    const y6 = [myData.main.humidity]; // Humidity data
    const y7 = [myData.main.sea_level]; // Sea Level data
    const y8 = [myData.main.grnd_level]; // Ground Level data

    // Data array for uPlot
    const data = [
        x,
        y1,
        y2,
        y3,
        y4,
        y5,
        y6,
        y7,
        y8
    ];
        console.log(data)
        const options = {
            title:'Advanced Weather Insights',
            height: 400,
            width:600,
            scales: {
                x:{
                    time:false,
                    
                },
                y:{
                    size: 60,
                space: 10,
                }
            },
            series: [{},{label:'temp',
                stroke: 'red',
                width:9,size: 60,
                space: 10,
                // dash:[10,5]
            },{label:'feels_like',
                stroke: 'yellow',
                width:8,size: 60,
                space: 10,
                // dash:[10,5]
            },{label:'temp_min',
                stroke: 'green',
                width:7,size: 60,
                space: 10,
                // dash:[10,5]
            },{label:'temp_max',
                stroke: 'blue',
                width:6,size: 60,
                space: 10,
                // dash:[10,5]
            },{label:'pressure',
                stroke: 'orange',
                width:5,size: 60,
                space: 10,
                // dash:[10,5]
            },{
                label:'humidity',
                stroke: 'magenta',
                width:4,size: 60,
                space: 10,
                // dash:[10,5]
            },{
                label:'sea_level',
                stroke: 'black',
                width:3,size: 60,
                space: 10,
                // dash:[10,5]
            },{
                label:'grnd_level',
                stroke: 'pink',
                width:2,size: 60,
                space: 10,
                // dash:[10,5]
            }]
        }

        new uPlot(options,data,div)
    return div;
}
