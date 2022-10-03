const express = require("express");
const router = express.Router();
const {
  createCommentLogic,
  allCommentsLogic,
  oneCommentLogic,
  updateCommentLogic,
  deleteCommentLogic,
} = require("../services/commentsService");

const createComment = async (req, res) => {
  const newComment = await createCommentLogic(req.body);

  if (newComment._id) {
    res
      .status(200)
      .json({ message: "New comment to forumpost has been added" });
  } else {
    res.status(400).json({ error: "Could not save comment" });
  }
};
router.post("/newcomment", createComment);

// Get All comments for each forumpost
const allComments = async (req, res) => {
  const comments = await allCommentsLogic();

  if (comments) {
    res.status(200).json({ comments });
  } else {
    res.status(400).json({ error: "No comments found" });
  }
};
router.get("/", allComments);

// get ONE comment by ID
const oneComment = async (req, res) => {
  const { id } = req.params;
  const comment = await oneCommentLogic(id);

  if (comment._id) {
    res.status(200).json({
      message: `Found this comment: ${comment.title} under the Forumpost with title: ${forumpost.title} `,
    });
  } else {
    res.status(400).json(error);
  }
};
router.get("/:id", oneComment);

// Update one commentby ID
const updateComment = async (req, res) => {
  const { id } = req.params;
  const comment = await updateCommentLogic(id);

  if (comment.id) {
    res.status(200).json({ message: "Comment was successfully updated" });
  }
  if (!comment.id) {
    res
      .status(400)
      .json({ error: "Could not find a commetn with matching ID to update" });
  } else {
    res.status(500).json({ erro: "Oops something went wrong" });
  }
};
router.patch("/:id", updateComment);

// Delete one Comment by ID
const deleteComment = async (req, res) => {
  const { id } = req.params;
  const comment = await deleteCommentLogic(id);

  if (comment.id) {
    res.status(201).json({ message: "Comment was successfully deleted" });
  }
  if (!comment.id) {
    res
      .status(400)
      .json({ error: " Could not find a comment with matching ID to delete" });
  } else {
    res.status(500).json({ error: "Oops something went wrong" });
  }
};
router.delete("/:id", deleteComment);

module.exports = {
  createComment,
  allComments,
  oneComment,
  updateComment,
  deleteComment,
  router,
};
