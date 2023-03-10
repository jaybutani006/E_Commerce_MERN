const express = require("express");

const { register, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getOneUser, updateUserRole, deleteUser } = require("../controllers/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole);
router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles('admin'), getOneUser);

module.exports = router;