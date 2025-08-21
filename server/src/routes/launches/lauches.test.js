const request = require("supertest");
const app = require("../../app");
describe("To GET /launches", () => {
  test("it should return 200 status code", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
describe("To POST /launches", () => {
  const completeData = {
    launchDate: "December 21, 2020",
    mission: "sindoor2",
    rocket: "sindoor 131",
    target: "russia",
  };
  const completeDataWithoutDate = {
    mission: "sindoor2",
    rocket: "sindoor 131",
    target: "russia",
  };
  test("it should return 201 status code", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeData)
      .expect("Content-Type", /json/)
      .expect(201)
    const requestDate = new Date(completeData.launchDate).valueOf()
    const responseDate = new Date(response.body.launchDate).valueOf()

      expect(requestDate).toBe(responseDate)
      expect(response.body).toMatchObject(completeDataWithoutDate)
  });
});
