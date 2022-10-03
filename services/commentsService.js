const Comment = require("../models/commentsModel");

const createCommentLogic = (comment) => {
  const { text, user, post } = comment;
  try {
    const newComment = new Comment({
      ...comment,
    });

    if (!text) {
      return "You can not leave text field empty";
    }
    if (!user) {
      return "username missing";
    }
    if (!post) {
      return "post missing";
    }

    newComment.save();
    return newComment();
  } catch (error) {
    return error;
  }
};
const allCommentsLogic = () => {
  try {
    const comments = Comments.find({});
    if (!comments) {
      return "No comments found";
    }
    return comments;
  } catch (error) {
    return error;
  }
};

const getAllCommentsByPost = (postId) => {
  try {
    const comments = Comments.find({ post: postId });
    if (!comments) {
      return "No comments found";
    }
  } catch (error) {
    return error;
  }
};

const oneCommentLogic = (id) => {
  try {
    const oneComment = Comment.findById(id);
    if (!oneComment) {
      return error;
    }
    return oneComment;
  } catch (error) {
    return error;
  }
};

const updateCommentLogic = (id, body) => {
  try {
    const comment = Comment.findOneAndUpdate({ _id: id }, { ...body });
    if (!comment) {
      return error;
    }
    return comment;
  } catch (error) {
    return error;
  }
};

const deleteCommentLogic = (id) => {
  try {
    const comment = Comment.findByIdAndDelete({ _id: id });

    if (!comment) {
      return "No comment with matching ID was found";
    }
    return comment;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createCommentLogic,
  allCommentsLogic,
  getAllCommentsByPost,
  oneCommentLogic,
  updateCommentLogic,
  deleteCommentLogic,
};
