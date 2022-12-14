const request = require("supertest");
const baseURL = "http://localhost:3030/api/user";

describe("GET users", () => {
  const newUser = {
    email: "petratest@mail.com",
    password: "testword",
  };
  beforeAll(async () => {
    await request(baseURL).post("/signup").send(newUser);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/${newUser.email}`);
  });

  it("Should return status 200", async () => {
    const res = await request(baseURL).get(`/${newUser.email}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBe(undefined);
  });
  it("should return user by email", async () => {
    const res = await request(baseURL).get("");
    expect(res.body.users.length >= 1).toBe(true);
  });
});

describe("Post to user", () => {
  const newUser = {
    email: "petratest@mail.com",
    password: "testword",
  };
  afterAll(async () => {
    await request(baseURL).delete(`/${newUser.email}`);
  });

  it("Should add a new user to db", async () => {
    const res = await request(baseURL).post("/signup").send(newUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(newUser.email);
  });
});

describe("Patch/update user", () => {
  const newUser = {
    email: "petratest@mail.com",
    password: "testword",
  };
  const updatedEmail = "testis@test.com";
  beforeAll(async () => {
    await request(baseURL).post("/signup").send(newUser);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/${newUser.email}`);
  });

  it("should update/patch users email", async () => {
    const res = await request(baseURL).patch(`/${newUser.email}`).send({
      email: updatedEmail,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(updatedEmail);
  });
});
