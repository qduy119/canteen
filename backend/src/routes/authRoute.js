const express = require("express");
const passport = require("passport");
const UserController = require("../controllers/user");
const { protect, restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.route("/authenticate").post(UserController.authenticate);

// Google
router
    .route("/auth/google")
    .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/auth/google/callback").get((req, res, next) => {
    passport.authenticate(
        "google",
        UserController.handleThirdPartyAuthentication(req, res, next)
    )(req, res, next);
});

// Facebook
router.route("/auth/facebook").get(passport.authenticate("facebook"));

router.route("/auth/facebook/callback").get((req, res, next) => {
    passport.authenticate(
        "facebook",
        UserController.handleThirdPartyAuthentication(req, res, next)
    )(req, res, next);
});

router.route("/register").post(UserController.register);

router
    .route("/logout")
    .post(protect, restrictTo("Customer", "Admin"), UserController.logout);
router.route("/refresh-token").get(UserController.refresh);

module.exports = router;
