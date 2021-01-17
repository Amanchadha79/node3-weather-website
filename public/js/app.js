

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((resdata) =>{
//         console.log(resdata)
//     })
// })





const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    //console.log(location)
    const url = 'http://localhost:3000/weather?address=' + location

    fetch(url).then((response) => {
    response.json().then((data) => {
        
        if (data.error) {
            messageTwo.textContent = data.error
            messageOne.textContent = ''
        } else {
            messageOne.textContent = data.location
            const messagefin = data.weatherdata.temperature + ' ' + data.weatherdata.feelslike
            messageTwo.textContent = messagefin  
        }
    })
})
})
