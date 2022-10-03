const { MongoClient } = require("mongodb");
const request = require("supertest");

const { createQuestionLogic } = require("../services/questionServices");

describe("Testing with supertest", () => {
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });
  describe("create a question", () => {
    let connection;
    let db;

    beforeAll(async () => {
      connection = await MongoClient.connect(
        "mongodb+srv://QuizForum:btSdlXz82dAomW3F@cluster0.xafiaul.mongodb.net/?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      db = await connection.db("QuizForum");
    });

    it("should insert a doc into collection", async () => {
      const questions = db.collection("questions");

      const mockQuestion = {
        _id: "630675e4d515e80c26eb14f3",
        question: "Q1?",
        correctAnswer: "correct!",
        incorrectAnswer: "wroooong",
      };
      await createQuestionLogic(mockQuestion);

      const insertedQuestion = await questions.findOne({
        _id: "630675e4d515e80c26eb14f3",
      });

      expect(insertedQuestion).toEqual(mockQuestion);
    });
  });
});
