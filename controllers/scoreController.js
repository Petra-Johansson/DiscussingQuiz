const express = require("express");
const router = express.Router();

const {} = require("../services/scoreServices");
const Score = require("../models/scoreModel");

const allScores = () => {};
router.get("/");

const getUserScore = () => {};
router.get("/:userID");

const newUserScore = () => {};
router.post("/");

const deleteAllScores = () => {};
router.delete("/");
