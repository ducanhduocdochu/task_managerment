"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const authentication = require("../../middlewares/auth.middleware");
const boardController = require("../../controllers/board.controller");
const router = express.Router();

// middleware
router.use(authentication);

router.get("/board", asyncHandler(boardController.getListBoard));
router.post("/board", asyncHandler(boardController.createBoard));
router.put('/board/:id', asyncHandler(boardController.updateBoard))
router.delete('/board/:id', asyncHandler(boardController.deleteBoard))

module.exports = router;
