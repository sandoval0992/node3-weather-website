console.log('Client side javascript file is loaded')

/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
//*/
/*
fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) => {
        if(data.error){
            return console.log(data.error)
        }
        console.log(data.location)
        console.log(data.forecast)
    })
})
//*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    messageOne.textContent = 'Getting weather forecast...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            return messageOne.textContent = data.error
        }
        messageOne.innerHTML = '<b>Location: </b>' + data.location
        messageTwo.innerHTML = '<b>Forecast: </b>' + data.forecast
    })
})    
})

