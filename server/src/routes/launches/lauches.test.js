const request = require('supertest')
const app = require('../../app')
describe("To GET /launches" , () => {
    test("it should return 200 status code" , async () => {
        const response = await request(app)
        .get('/launches') 
        .expect("Content-Type" , /json/)
        .expect(200)
    })
})
describe("To POST /launches" , () => {
    test("it should return 201 status code" , async () => {
        const response = await request(app)
        .post('/launches') 
        .expect("Content-Type" , /json/)
        .expect(201)
    })
})