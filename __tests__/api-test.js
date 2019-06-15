const axios = require("axios");

describe("#getUser() using async/await", () => {
  it("should load user data", async () => {
    const data = await axios.get("http://localhost:5000/api/deliveries");
    expect(data.data).toBeDefined();
    expect(data.data.message).toEqual("done");
  });
});
