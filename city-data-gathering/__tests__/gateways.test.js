const { get_weather, get_sunrise_sunset } = require('../src/gateways/api_funcs')

describe('tests for OpenWeatherAPI gateway', () => {
    test('get weather without supplying api key, must return 200 because auto key is valid', async () => {
        const data = await get_weather('Aveiro');
        expect(data['status']).toBe(200)
    })
    
    test('get weather inexistent city name, must give 404', async () => {
        const data = await get_weather('Alfarazza');
        expect(data['status']).not.toBe(200)
    })

    test('get weather of comma separated list, will fail because of implemented linting', async () => {
        const data = await get_weather('Porto,Aveiro,Lisboa');
        expect(data['status']).not.toBe(200)
        expect(data['message']).toBe('city_name cointains forbidden characters')
    })
    
    test('get weather of space separated list, will fail because api wont\'t be able to detect the city', async () => {
        const data = await get_weather('Porto Aveiro Lisboa');
        expect(data['status']).not.toBe(200)
    })

    test('get weather of city with spaces in the name, must pass', async () => {
        const data = await get_weather('Baixa da banheira');
        expect(data['status']).toBe(200)
        expect(data['coordinates']['lat']).toBeCloseTo(38.65, 1)
        expect(data['coordinates']['lon']).toBeCloseTo(-9.04, 1)
    })

    test('get weather with invalid key, will fail with unauth code', async () => {
        const data = await get_weather('Aveiro', 'asdf');
        expect(data['status']).toBe(401)
    })
})

describe('tests for Sunset-Sunrise API gateway', () => {
    test('get sunrise time from an existing location (0,0)', async () => {
        const data = await get_sunrise_sunset(0,0);
        expect(data['status']).toBe(200)
    })

    test('get sunrise time from a non existing location (1000,0)', async () => {
        const data = await get_sunrise_sunset(1000,0);
        expect(data['status']).toBe(404)
    })
})