const express = require("express");
const {
  getSpecificThread,
  updateThread,
  deleteThread,
  createNewThread,
  postsFromManyOwners,
} = require("../controllers/threadController");
const threadRouter = express.Router();
const { body } = require("express-validator");
const passingValidationErrors = require("../controllers/passingValidationErrors");
threadRouter.get("/", postsFromManyOwners);
threadRouter.get("/:threadId", getSpecificThread);
threadRouter.post(
  "/",
  body("type").notEmpty().withMessage("Type field is required"),
  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isLength({
      min: 8,
      max: 400,
    })
    .withMessage("Content has to be between 8 and 400"),
    passingValidationErrors,
  createNewThread
);
threadRouter.put("/:threadId", updateThread);
threadRouter.delete("/:threadId", deleteThread);

module.exports = threadRouter;
