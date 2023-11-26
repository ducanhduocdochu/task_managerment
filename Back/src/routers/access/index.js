"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const authentication = require("../../middlewares/auth.middleware");
const router = express.Router();

// Register
router.post("/user/register", asyncHandler(accessController.register));
// Login
router.post("/user/login", asyncHandler(accessController.login));

// middleware
router.use(authentication);
// Logout
router.post('/user/logout', asyncHandler(accessController.logout))
router.post('/user/refresh_token', asyncHandler(accessController.refreshToken))

module.exports = router;
