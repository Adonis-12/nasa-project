const request = require('supertest')
const app = require('../../app')
describe("To GET /planets" , () => {
    test("it should return 200 status code" , async () => {
        const response = await request(app)
        .get('/planets') 
        .expect("Content-Type" , /json/)
        .expect(200)
    })
})