const path = require('path');
const axios = require('axios');
const config = require('config');
const express = require('express');
const expressDebug = require('debug')('app:express');

const app = express();
var port, backend, backend_port;
try {
    port = config.get('PORT');
    backend = config.get('BACKEND');
    backend_port = config.get('BACKEND_PORT');    
} catch (error) {
    port = 3000;
    backend = '127.0.0.1';
    backend_port = 8000
}

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        'title': 'zether'
    })
})

app.get('/city', async (req, res) => {
    expressDebug(`requesting data to city display http://${backend}:${backend_port}`)
    const data = (await axios.get(`http://${backend}:${backend_port}/cdg/city_data?city_list=Porto`)).data
    expressDebug('data requested')
    console.log(data['Porto'])
    res.render('city_display', { 'data':data})
})

app.get('/cities', async (req, res) => {
    expressDebug(`requesting data to city display http://${backend}:${backend_port}`)
    const data = (await axios.get(`http://${backend}:${backend_port}/cdg/city_data?city_list=Porto,Lisboa,Aveiro, San Diego`)).data
    expressDebug('data requested')
    console.log(data)
    res.render('cities_display', { 'data':data})
})

app.get('/display', async (req, res) => {
    console.log(req.query.city_list)
    expressDebug(`CityList: ${req.query.city_list}`)
    expressDebug(`requesting data to city display http://${backend}:${backend_port}`)
    const data = (await axios.get(`http://${backend}:${backend_port}/cdg/city_data?city_list=${req.query.city_list}`)).data
    expressDebug('data requested')
    console.log(data)
    res.render('cities_display', { 'data':data})
})


app.listen(port, () => {
    expressDebug(`Server is up & running @ port ${port}`)
})