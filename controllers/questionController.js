const express = require("express");

const {
  createQuestionLogic,
  oneQuestionLogic,
  updateQuestionLogic,
  deleteQuestionLogic,
  allQuestionsLogic,
} = require("../services/questionServices");
const router = express.Router();

// CREATE QUESTION
const createQuestion = async (req, res) => {
  const newQuestion = await createQuestionLogic(req.body);

  if (newQuestion._id) {
    return res.status(200).json(newQuestion);
  } else {
    return res.status(400).json(error);
  }
};
router.post("/newquestion", createQuestion);

// GET /READ ALL QUESTIONS
const allQuestions = async (req, res) => {
  const questions = await allQuestionsLogic();
  if (questions) {
    res.status(200).json({ questions });
  } else {
    res.status(400).json(error);
  }
};
router.get("/", allQuestions);

// GET / READ ONE QUESTION BY ID
const oneQuestion = async (req, res) => {
  const { id } = req.params;

  const question = await oneQuestionLogic(id);
  if (question._id) {
    return res.status(200).json({ question });
  } else {
    return res
      .status(400)
      .json({ error: "Can not find a question with matching ID" });
  }
};
router.get("/:id", oneQuestion);

// UPDATE ONE QUESTION BY ID
const updateQuestion = async (req, res) => {
  const { id } = req.params;

  const question = await updateQuestionLogic(id, req.body);
  if (id) {
    return res.status(200).json({
      message: `Question with id:  ${question.id} was successfully updated`,
    });
  } else {
    return res.status(400).json({ error: "Could not update question" });
  }
};
router.patch("/:id", updateQuestion);

// DELETE ONE QUESTION
const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  const question = await deleteQuestionLogic(id);
  if (question.id) {
    return res.status(201).json("Question successfully deleted");
  } else {
    return res.status(400).json({ error: "Could not find the id" });
  }
};
router.delete("/:id", deleteQuestion);

module.exports = {
  createQuestion,
  allQuestions,
  oneQuestion,
  updateQuestion,
  deleteQuestion,
  router,
};
