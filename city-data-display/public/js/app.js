console.log('Client side javascript file is loaded!')

const form = document.querySelector('form')
const search = document.querySelector('input')
//document.getElementById('goBack').onclick = function () {
//    window.location.replace(`http://localhost:3000/`)
//}


form.addEventListener('submit', (event) => {
    event.preventDefault()
    const city_names = search.value
    console.log(city_names)
    console.log('ola')
    window.location.replace(`http://localhost:3000/display?city_list=${city_names}`)
})