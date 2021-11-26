const fs = require('fs')
const axios = require('axios')
const logger = require('../logger')
const debug = require('debug')('app:gateway')


/**
 * Get weather and coordinates data from a city name
 * 
 * @author ZePaiva <zmppaiva99@gmail.com>
 * 
 * @async
 * 
 * @function get_weather
 * 
 * @param {string} city_name - city name, is it is possible, if it isn't it will default to location 
 * @param {string} api_key   - api key for the used api
 * 
 * @returns {JSON} - returns json dictionary with status OK (200) and requested data or ERROR (404) and the error cause
 */
async function get_weather(city_name, api_key='c23abdf2ed90b8421c9644f0d0ea85fb') {
    debug(`[get_weather] linting city_name var ${city_name}`)
    if (!/^([a-zA-Z\u00C0-\u00FF\- ]*)$/.test(city_name)) {
        return {
            'status'  : 404,
            'message' : 'city_name cointains forbidden characters'
        }
    }
    debug(`[get_weather] getting data for city ${city_name}`)
    logger.info(`[f/ get_weather] gathering data of ${city_name} from OpenWeatherAPI (Lat,Lon,Temp)`)
    try {
        var city_data = (await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}&units=metric`)).data
    } catch (err) {
        return {
            'status'  : err.response.status,
            'message' : err.response.data.message
        }
    }
    debug(`[get_weather] request returned: ${city_data['cod']}`)
    return {
        'status'      : city_data['cod'],      
        'coordinates' : city_data['coord'],
        'temperature' : city_data['main']['temp'],
    }    
} 

/**
 * Get sunrise and sunset times from a city or city address
 * 
 * @author ZePaiva <zmppaiva99@gmail.com>
 * 
 * @async
 * 
 * @function get_sunrise_sunset
 * 
 * @param {float}  lat       - latitude of desired city
 * @param {float}  long      - longitude of desired city 
 * 
 * @returns {JSON} - returns json dictionary with status OK (200) and requested data or ERROR (404) and the error cause
 */
async function get_sunrise_sunset(lat, lon) {
    logger.info(`[f/ get_weather] gathering data of location (${lat},${lon}) from Sunrise-Sunset API (Sunrise,Sunset)`)
    var city_suntimes = (await axios.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`)).data
    if (city_suntimes['results']['sunrise'].includes('1970')) {
        return {
            'status'  : 404,
            'message' : 'Location not found in Sunrise-Sunset'
        }
    }
    return {
        'status'  : 200,
        'sunrise' : new Date(city_suntimes['results']['sunrise']),
        'sunset'  : new Date(city_suntimes['results']['sunset']) 
    }
}

module.exports = {get_sunrise_sunset, get_weather}