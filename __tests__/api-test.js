const axios = require("axios");
const User = require("../models/User");

const git = require("simple-git");

afterAll(async () => {
  await git()
    .add("./*")
    .commit(`This was done after test today ${new Date().getDate}`)
    .push("origin", "Authentication");
  console.log("done");
});

describe("#getUser() using async/await", () => {
  test("should load user data", async () => {
    const data = await axios.get("http://localhost:5000/api/deliveries");
    expect(data.data).toBeDefined();
    expect(data.data.message).toEqual("done");
  });
});

describe("Every possible occurence on a user model", () => {
  it("insert a user", async () => {
    expect.assertions(1);
    const new_user = {
      name: "Fisayo",
      email: "kelly@ksellyss.com",
      password: "1",
      password2: "1",
      role: "user",
      phone_number: "111111"
    };
    const response = await axios.post(
      "http://localhost:5000/api/users/",
      new_user
    );
    expect(response.data.name).toEqual(new_user.name);
    expect(response.data).toBe(typeof new_user);
    // expect(response.data).toBeTruthy();
  });

  it("should return a 400", async () => {
    const new_user = {};
    const response = await axios.post(
      "http://localhost:5000/api/users/",
      new_user
    );
    expect(response.status).toBeFalsy();
  });
});
