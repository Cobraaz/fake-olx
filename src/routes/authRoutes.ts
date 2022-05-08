import express from "express";
const router = express.Router();
import { login, me, register, profile } from "../controllers/authController";
import { check } from "express-validator";
import Authenticated from "../middleware/Authenticated";

router.post(
  "/signup",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").not().isEmpty().isEmail(),
    check("phone_no", "Please include a valid email")
      .not()
      .isEmpty()
      .isMobilePhone("en-IN"),
    check("password", "Password must be between 4 to 16 characters").isLength({
      min: 6,
      max: 16,
    }),
    check("confirm_password", "Password must be between 4 to 16 characters")
      .isLength({ min: 4, max: 16 })
      .custom(async (confirmPassword, { req }) => {
        const password = req.body.password;
        if (password !== confirmPassword) {
          throw new Error("Passwords must be same");
        }
      }),
  ],
  register
);

router.post(
  "/signin",
  [
    check("email", "Please include a valid email").not().isEmpty().isEmail(),
    check("password", "Password must be between 4 to 16 characters").isLength({
      min: 6,
      max: 16,
    }),
  ],
  login
);

router.patch(
  "/profile",
  [
    check("name", "Name is required").not().isEmpty(),
    check("phone_no", "Please include a valid email")
      .not()
      .isEmpty()
      .isMobilePhone("en-IN"),
    check("password", "Password must be between 4 to 16 characters")
      .optional()
      .isLength({
        min: 6,
        max: 16,
      }),
    check("avatar", "Avatar is required").not().isEmpty(),
    Authenticated,
  ],
  profile
);

router.get("/me", Authenticated, me);

export default router;
