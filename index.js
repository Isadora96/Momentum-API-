const authorImage = document.getElementById("author-image")
const infoCrypto = document.getElementById("crypto-top")
const coinInfo = document.getElementById("coin-info")
const crypto = document.getElementById("crypto")
const quote = document.getElementById("quote")
const phrase = document.getElementById("phrase")
const btnAdvice = document.getElementById("btn-advice")
const btnMovieQuote = document.getElementById("btn-show-quotes")
const authorQuote = document.getElementById("author-quote")
const btnJoke = document.getElementById("btn-joke")


fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=universe")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        authorImage.textContent = `Image by: ${data.user.name}`
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1520607725487-81e65ed08c8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjgwMzAyNjE&ixlib=rb-1.2.1&q=80&w=1080
)`
		authorImage.textContent = `Image by: Kym MacKinnon`
    })
    
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => res.json())
    .then(data => {
       infoCrypto.innerHTML = `
         <img src="${data.image.small}">
         <span id="coin-info">${data.name}</span>
       `
       crypto.innerHTML += `
         <p>🎯: R$ ${data.market_data.current_price.brl}</p>`
    })
    .catch(err => {
       infoCrypto.textContent = "Unavailable! Refresh the page!"
    })

function getCurrentData() {
    const currentTime = new Date()
    const time = currentTime.toLocaleTimeString("pt-br", {timeStyle: "medium"})
    document.getElementById("time").textContent = time
}

setInterval(getCurrentData, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
    .then(res => res.json())
    .then(data => {
        const temp = Math.round(data.main.temp)
        const toCelsius = Math.round((temp - 32) * 5/9)
        document.getElementById("weather").innerHTML = `
            <p class="temp">${toCelsius}°</p> 
            <p class="city">${data.name}</p> 
        `
    })
    .catch(err => {
        document.getElementById("weather").innerHTML = `
            <p>Weather unavailable</p>
        `
    })
})

btnAdvice.addEventListener("click", getRandomAdvice)

async function getRandomAdvice(){
    const response = await fetch("https://api.adviceslip.com/advice")
    const data =  await response.json()
    quote.textContent = ''
    phrase.textContent = `" ${data.slip.advice} "`
    authorQuote.innerText = `author: Unknown`
}

btnMovieQuote.addEventListener("click", getMovieQuote)

async function getMovieQuote() {
    const response = await fetch("https://movie-quote-api.herokuapp.com/v1/quote/")
    const data = await response.json()
    quote.textContent = ''
    phrase.textContent = `" ${data.quote} "`
    authorQuote.innerText = `show: ${data.show}`
}

btnJoke.addEventListener("click", function(){
    fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        quote.textContent = ''
        phrase.textContent = `" ${data.setup} "`
        authorQuote.textContent = "the answer is...."
        setTimeout(()=>{
            authorQuote.innerText = `😂: ${data.punchline}`
        }, 2700)
    })
})


