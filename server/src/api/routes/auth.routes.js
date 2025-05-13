const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth.controller");
const {
  validateRegister,
} = require("../../common/middlewares/auth.middlewares");

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     description: Login
 *     tags:
 *        - auth
 *     requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              description: login email
 *                              type: string
 *                          password:
 *                              description: login password
 *                              type: string
 *     responses:
 *       200:
 *         description: Login successfully
 *       406:
 *         description: Invalid email or password
 *       409:
 *         description: Email not found
 *       500:
 *         description: Internal server error
 */
router.post("/login", authControllers.login);

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     description: Register
 *     tags:
 *        - auth
 *     requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              description: register email
 *                              type: string
 *                          password:
 *                              description: register password
 *                              type: string
 *     responses:
 *       201:
 *         description: Register successfully
 *       406:
 *         description: Invalid email or password
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.post(
  "/register",
  authControllers.register
);

module.exports = router;
