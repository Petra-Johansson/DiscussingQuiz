const request = require("supertest");
const baseURL = "http://localhost:3030/api/forum";

describe("GET foumposts", () => {
  const newPost = {
    _id: "630675e4d515e80c26eb14f4",
    title: "New test title",
    text: "New test text",
    category: "Other",
  }
  beforeAll(async () => {
    await request(baseURL).post("/newpost").send(newPost);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/${newPost._id}`);
  });
  it("Should return status 200", async () => {
    const res = await request(baseURL).get(`/${newPost._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBe(undefined);
  });
  it("should return forumpost by _id", async () => {
    const res = await request(baseURL).get("");
    expect(res.body.forumposts.length >= 1).toBe(true);
  });
});

describe("Post to forum", ()=> {
  const newPost = {
    _id: "630675e4d230c26e234f4",
    title: "New test title",
    text: "New test text",
    category: "Other",
  }
  afterAll(async()=> {
    await request(baseURL).delete(`/${newPost._id}`);
  });

  it("Should add a new forumpost to db", async () => {
    const res = await request(baseURL).post("/newpost").send(newPost);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(newPost.title);
  });
});

describe("Patch/update post", () => {
  const newPost = {
    _id: "630675e10515e80c26eb14f4",
    title: "New test title",
    text: "New test text",
    category: "Other",
  }
  const updatedText = "updated text";

  beforeAll(async () => {
    await request(baseURL).post("/newppost").send(newPost);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/${newPost._id}`);
  });

  it("should update the text of the post", async () => {
    const res = await request(baseURL).patch(`/${newPost._id}`).send({
      text: updatedText,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.text).toBe(updatedText)
  });
});