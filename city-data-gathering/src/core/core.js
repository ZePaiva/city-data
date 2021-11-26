const config = require('config')
const express = require('express')
const logger = require('../logger')
const debug = require('debug')('app:core')
const gateways = require('../gateways/api_funcs')

const router = new express.Router()

/**
 * Queries cities data based on list of city names
 */
router.get('/city_data', async (req, res) => {
    const city_list = req.query.city_list;
    debug(`[/city_data] Received city list: ${city_list}`);
    logger.info(`[/city_data] Received city list: ${city_list}`)
    if (!city_list) {
        debug(`[/city_data] Received empty or no list, proceeding to return error`)
        logger.warn(`[/city_data] Received empty or no list, proceeding to return error`)
        return res.status(405).send({'message':'City List is required'})
    }
    for (var index = 0, doc = {}, cities = city_list.split(','); index < cities.length; index++) {
        debug(`[/city_data] Getting temperature and lat/lon for city of ${cities[index]}`)
        logger.debug(`[/city_data] Getting temperature and lat/lon for city of ${cities[index]}`)
        const city_temp = await gateways.get_weather(city_name = cities[index], api_key = config.get('OpenWeather'));
        if (city_temp['status'] != 200) {
            debug(`[/city_data] Got data with ERROR code ${city_temp['status']}`)
            logger.warn(`[/city_data] Got data with ERROR code ${city_temp['status']}`)
            doc[cities[index]] = {
                'status'   : 404,
                'message:' : `Data for ${cities[index]} not found, reason: ${city_temp['message']}`
            }
        } else {
            debug(`[/city_data] Got data with OK code ${city_temp['status']}`)
            logger.debug(`[/city_data] Got data with OK code ${city_temp['status']}`)
            const city_sunrise_sunset = await gateways.get_sunrise_sunset(city_temp['coordinates']['lat'], city_temp['coordinates']['lon'], config.get('OpenWeather'));
            debug(`[/city_data] Got sunrise data`)
            logger.debug(`[/city_data] Got sunrise data`)
            doc[cities[index]] = {
                'status'      : 200,
                'temperature' : city_temp['temperature'],
                'sunrise'     : `${city_sunrise_sunset['sunrise'].getHours()}:${city_sunrise_sunset['sunrise'].getMinutes()}:${city_sunrise_sunset['sunrise'].getSeconds()}`,
                'sunset'      : `${city_sunrise_sunset['sunset'].getHours()}:${city_sunrise_sunset['sunset'].getMinutes()}:${city_sunrise_sunset['sunset'].getSeconds()}`
            }
        }        
    }
    res.status(200).send(doc);
})

module.exports = router;