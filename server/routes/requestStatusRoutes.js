const express = require("express");
const {
  getAllRequestStatuses,
  createRequestStatus,
  updateRequestStatus,
  deleteRequestStatus,
  getRequestStatusById,
  getRequestStatusByCriterium,
} = require("../controllers/requestStatusController");
const requestStatusRouter = express.Router();
const { body } = require("express-validator");
const { requestsList } = require("../utils/requestTypes");
const passingValidationErrors = require("../utils/passingValidationErrors");

requestStatusRouter.get("/", getAllRequestStatuses);
requestStatusRouter.get("/criteria", getRequestStatusByCriterium);
requestStatusRouter.get("/:requestStatusId", getRequestStatusById);
requestStatusRouter.post(
  "/",
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required")
    .custom((status) => {
      if (!requestsList.includes(status)) {
        throw Error("status should be: 'pending', 'accepted', 'rejected'");
      }
      return true
    }),

  passingValidationErrors,
  createRequestStatus
);
requestStatusRouter.put("/:requestStatusId", updateRequestStatus);
requestStatusRouter.delete("/:requestStatusId", deleteRequestStatus);

module.exports = requestStatusRouter;
