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

async function getRandomImage() {
    const url = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=universe"

    try {
        const res = await fetch(url)
        const data = await res.json()
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        authorImage.textContent = `Image by: ${data.user.name}`
    } catch(err) {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1520607725487-81e65ed08c8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjgwMzAyNjE&ixlib=rb-1.2.1&q=80&w=1080
        )`
        authorImage.textContent = `Image by: Kym MacKinnon`
    }
}

getRandomImage()

async function getInfoCoin() {
    const url = "https://api.coingecko.com/api/v3/coins/bitcoin"

    try {
        const res = await fetch(url)
        const data = await res.json()
        infoCrypto.innerHTML = `
            <img src="${data.image.small}">
            <span id="coin-info">${data.name}</span>
        `
        crypto.innerHTML += `
            <p>🎯: R$ ${data.market_data.current_price.brl}</p>`
    } catch(err) {
        infoCrypto.textContent = "Unavailable! Refresh the page!"
    }
}

getInfoCoin()

function getCurrentData() {
    const currentTime = new Date()
    const time = currentTime.toLocaleTimeString("pt-br", {timeStyle: "medium"})
    document.getElementById("time").textContent = time
}

setInterval(getCurrentData, 1000)

navigator.geolocation.getCurrentPosition( async (position) => {
    
    const url = `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
    
    try {
        const response = await fetch(url)
        const data = await response.json()
        const temp = Math.round(data.main.temp)
        const toCelsius = Math.round((temp - 32) * 5/9)
        document.getElementById("weather").innerHTML = `
            <p class="temp">${toCelsius}°</p> 
            <p class="city">${data.name}</p> 
        `
    } catch(err) {
        document.getElementById("weather").innerHTML = `
            <p>Weather unavailable</p>
        `
    }
})

btnAdvice.addEventListener("click", getRandomAdvice)
async function getRandomAdvice(e) {
    e.preventDefault()
    const url = "https://api.adviceslip.com/advice"

    try {
        const response = await fetch(url)
        const data =  await response.json()
        quote.textContent = ''
        phrase.textContent = `" ${data.slip.advice} "`
        authorQuote.innerText = `author: Unknown`
    } catch(err) {
        phrase.textContent = "Sorry, something went wrong. How about seeing a quote from a movie or a joke."
        authorQuote.textContent = ""
    }
}

btnMovieQuote.addEventListener("click", getMovieQuote)
async function getMovieQuote(e) {
    e.preventDefault()
    const url = "https://movie-quote-api.herokuapp.com/v1/quote/"
    
    try {
        const response = await fetch(url)
        const data = await response.json()
        quote.textContent = ''
        phrase.textContent = `" ${data.quote} "`
        authorQuote.innerText = `show: ${data.show}`
    } catch(err) {
        phrase.textContent = "Sorry, something went wrong. How about seeing a piece of advice or a joke."
        authorQuote.textContent = ""
    }
}

btnJoke.addEventListener("click", getJoke)
async function getJoke(e) {
    e.preventDefault()
    const url = "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Christmas?blacklistFlags=racist,sexist,explicit&type=twopart&amount=10"

    try {
        const response = await fetch(url)
        const data = await response.json()
        data.jokes.map(joke => {
            quote.textContent = ''
            phrase.textContent = `" ${joke.setup} "`
            authorQuote.textContent = "the answer is...."
            setTimeout(()=>{
                authorQuote.innerText = `😂: ${joke.delivery}`
            }, 2700)
        })
    } catch (error) {
        phrase.textContent = "Sorry, something went wrong. How about seeing a piece of advice or a quote from a movie."
        authorQuote.textContent = ""
    }
}


