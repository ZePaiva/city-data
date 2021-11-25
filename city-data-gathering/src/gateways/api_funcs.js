const axios = require('axios')
const fs = require('fs')


/**
 * 
 * @param {float}  lat       - latitude of desired city
 * @param {float}  long      - longitude of desired city 
 * @param {string} city_name - city name, is it is possible, if it isn't it will default to location 
 * @param {string} api_key 
 */
async function get_weather(lat, long, city_name=null, api_key='c23abdf2ed90b8421c9644f0d0ea85fb') {
    if (city_name === null) {
        var city_data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`)
        if (city_data['cod']!==200) {
            return {
                'status' : city_data['cod'],
                'reason' : city_data['message']
            }
        } 
        return {
            'status'      : city_data['cod'],      
            'coordinates' : city_data['coord'],
            'temperature' : city_data['main']['temp'],
        }
    } else {
        var city_data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}&units=metric`)
        if (city_data['cod']!==200) {
            return {
                'status' : city_data['cod'],
                'reason' : city_data['message']
            }
        } 
        return {
            'status'      : city_data['cod'],      
            'coordinates' : city_data['coord'],
            'temperature' : city_data['main']['temp'],
        }
    }
} 