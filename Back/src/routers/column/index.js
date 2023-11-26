"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const authentication = require("../../middlewares/auth.middleware");
const ColumnController = require("../../controllers/column.controller");
const router = express.Router();

// middleware
router.use(authentication);

router.get("/column/:id", asyncHandler(ColumnController.getListColumn));
router.post("/column/:id", asyncHandler(ColumnController.createColumn));
router.put('/column/:id/:_id', asyncHandler(ColumnController.updateColumn))
router.delete('/column/:id/:_id', asyncHandler(ColumnController.deleteColumn))

module.exports = router;
