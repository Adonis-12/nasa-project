const request = require('supertest')
const app = require('../../app')
describe("To GET /launches" , () => {
    test("it should return 200 status code" , async () => {
        const response = await request(app).get('/launches') 
        expect(response.statusCode).toBe(200)
    })
})