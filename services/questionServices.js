const mongoose = require("mongoose");
const Question = require("../models/questionModel");

const createQuestionLogic = (question) => {
  const { title, correctAnswer, incorrectAnswer } = question;

  try {
    const newQuestion = new Question({
      ...question,
    });

    if (!title) {
      return "You can't leave title empty";
    }
    if (!correctAnswer) {
      return "You can't leave correct empty";
    }
    if (!incorrectAnswer) {
      return "You can't leave incorrect empty";
    }

    newQuestion.save();
    return newQuestion;
  } catch (error) {
    return error;
  }
};

const allQuestionsLogic = () => {
  try {
    const questions = Question.find({});
    if (!questions) {
      return res.status(400).json({ error: "No questions found" });
    }
    return questions;
  } catch (error) {
    return error;
  }
};

const oneQuestionLogic = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Question with given ID does not exist" });
  }

  try {
    const oneQuestion = await Question.findById(id);
    if (!oneQuestion) {
      return error;
    }
    return oneQuestion;
  } catch (error) {
    return error;
  }
};

const updateQuestionLogic = (id, body) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Question with given ID does not exist" });
  }

  try {
    const question = Question.findByIdAndUpdate({ _id: id }, { ...body });

    if (!question) {
      return error;
    }
    return question;
  } catch (error) {
    return error;
  }
};

const deleteQuestionLogic = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Question with given ID does not exist" });
  }

  try {
    const question = Question.findByIdAndDelete({ _id: id });

    if (!question) {
      return error;
    }
    return question;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createQuestionLogic,
  allQuestionsLogic,
  oneQuestionLogic,
  updateQuestionLogic,
  deleteQuestionLogic,
};
