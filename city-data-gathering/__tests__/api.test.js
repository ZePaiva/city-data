const request = require('supertest')
const app = require('../src/index')

describe('test only the root \'/\'', () => {
    test('returns hello world only', async () => {
        await request(app).get('/').expect(200);
    })

    test('nothing here so it will fail', async () => {
        await request(app).post('/').expect(404)
    })
})

describe('test main API to get the cities data', () => {
    test('request only one city', async () => {
        const res = await request(app).get('/cdg/city_data?city_list=Aveiro')
        expect(res.statusCode).toBe(200)
        expect(res.body['Aveiro']['status']).toBe(200)
        expect(res.body['Aveiro']).toHaveProperty('temperature')
        expect(res.body['Aveiro']).toHaveProperty('sunrise')
        expect(res.body['Aveiro']).toHaveProperty('sunset')
    })

    test('request no city', async () => {
        const res = await request(app).get('/cdg/city_data')
        expect(res.statusCode).toBe(405)
        expect(res.body['message']).toBe('City List is required')
        
    })

    test('request multiple cities', async () => {
        const res = await request(app).get('/cdg/city_data?city_list=Aveiro,Porto,Braga,Lisboa,Faro')
        expect(res.statusCode).toBe(200)
        expect(res.body['Aveiro']['status']).toBe(200)
        expect(res.body['Aveiro']).toHaveProperty('temperature')
        expect(res.body['Aveiro']).toHaveProperty('sunrise')
        expect(res.body['Aveiro']).toHaveProperty('sunset')
        expect(res.body['Porto']['status']).toBe(200)
        expect(res.body['Porto']).toHaveProperty('temperature')
        expect(res.body['Porto']).toHaveProperty('sunrise')
        expect(res.body['Porto']).toHaveProperty('sunset')
        expect(res.body['Braga']['status']).toBe(200)
        expect(res.body['Braga']).toHaveProperty('temperature')
        expect(res.body['Braga']).toHaveProperty('sunrise')
        expect(res.body['Braga']).toHaveProperty('sunset')
        expect(res.body['Faro']['status']).toBe(200)
        expect(res.body['Faro']).toHaveProperty('temperature')
        expect(res.body['Faro']).toHaveProperty('sunrise')
        expect(res.body['Faro']).toHaveProperty('sunset')
        expect(res.body['Lisboa']['status']).toBe(200)
        expect(res.body['Lisboa']).toHaveProperty('temperature')
        expect(res.body['Lisboa']).toHaveProperty('sunrise')
        expect(res.body['Lisboa']).toHaveProperty('sunset')
    })

    test('request inexistent city', async () => {
        const res = await request(app).get('/cdg/city_data?city_list=alfarrazza')
        expect(res.statusCode).toBe(200)
        expect(res.body['alfarrazza']['status']).toBe(404)
    })

    test('request multiple cities with one inexistent', async () => {
        const res = await request(app).get('/cdg/city_data?city_list=Aveiro,Porto,Braga,Lisboa,Faro,Alfarrabazza')
        expect(res.statusCode).toBe(200)
        expect(res.body['Aveiro']['status']).toBe(200)
        expect(res.body['Aveiro']).toHaveProperty('temperature')
        expect(res.body['Aveiro']).toHaveProperty('sunrise')
        expect(res.body['Aveiro']).toHaveProperty('sunset')
        expect(res.body['Porto']['status']).toBe(200)
        expect(res.body['Porto']).toHaveProperty('temperature')
        expect(res.body['Porto']).toHaveProperty('sunrise')
        expect(res.body['Porto']).toHaveProperty('sunset')
        expect(res.body['Braga']['status']).toBe(200)
        expect(res.body['Braga']).toHaveProperty('temperature')
        expect(res.body['Braga']).toHaveProperty('sunrise')
        expect(res.body['Braga']).toHaveProperty('sunset')
        expect(res.body['Faro']['status']).toBe(200)
        expect(res.body['Faro']).toHaveProperty('temperature')
        expect(res.body['Faro']).toHaveProperty('sunrise')
        expect(res.body['Faro']).toHaveProperty('sunset')
        expect(res.body['Lisboa']['status']).toBe(200)
        expect(res.body['Lisboa']).toHaveProperty('temperature')
        expect(res.body['Lisboa']).toHaveProperty('sunrise')
        expect(res.body['Lisboa']).toHaveProperty('sunset')
        expect(res.body['Alfarrabazza']['status']).toBe(404)
    })
})