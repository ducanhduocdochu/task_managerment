"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const authentication = require("../../middlewares/auth.middleware");
const TaskController = require("../../controllers/task.controller");
const router = express.Router();

// middleware
router.use(authentication);

router.get("/task/:id/:_id", asyncHandler(TaskController.getListTask));
// router.get("/column/:id/:_id", asyncHandler(TaskController.getTask));
router.post("/task/:id/:_id", asyncHandler(TaskController.createTask));
router.put('/task/:id/:_id/:id_', asyncHandler(TaskController.updateTask))
router.delete('/task/:id/:_id/:id_', asyncHandler(TaskController.deleteTask))

module.exports = router;
