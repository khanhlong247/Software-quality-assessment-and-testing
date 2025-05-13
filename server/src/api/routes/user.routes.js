const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/user.controller");

const {
  validateRegister,
  authenticate,
} = require("../../common/middlewares/auth.middlewares");

const {
  checkEmailRegister,
} = require("../../common/middlewares/check.middlewares");

const { authorize } = require("../../common/middlewares/role.middlewares");
const ROLES = require("../configs/role");

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - admin
 *     description: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all users successfully
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Permission denied
 *       500:
 *         description: Internal server error
 */

router.get("/", authenticate, authorize(ROLES.ADMIN), userControllers.getUser);

/**
 * @openapi
 * /api/users/info:
 *   get:
 *     tags:
 *       - user
 *     description: Get personal info
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get user info successfully
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Permission denied
 *       500:
 *         description: Internal server error
 */

router.get("/info", authenticate, userControllers.getSelf);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - admin
 *     description: Get user by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Get user info successfully
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Permission denied
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.get(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  userControllers.getUserById
);

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - admin
 *     description: Create user
 *     requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              description: email
 *                              type: string
 *                          password:
 *                              description: password
 *                              type: string
 *     responses:
 *       201:
 *         description: Create user successfully
 *       401:
 *         description: Invalid token
 *       406:
 *         description: Invalid email or password
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  userControllers.createUser
);

/**
 * @openapi
 * /api/users:
 *   put:
 *     tags:
 *       - user
 *     description: Update personal information
 *     requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              description: email
 *                              type: string
 *                          password:
 *                              description: password
 *                              type: string
 *     responses:
 *       201:
 *         description: Create user successfully
 *       401:
 *         description: Invalid token
 *       406:
 *         description: Invalid email or password
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.put(
  "/",
  authenticate,
  userControllers.updateUser
);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - admin
 *     description: Update user information by admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              description: email
 *                              type: string
 *                          password:
 *                              description: password
 *                              type: string
 *     responses:
 *       200:
 *         description: Updated user successfully
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Permission denied
 *       404:
 *         description: User not found
 *       406:
 *         description: Invalid email or password
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */

router.put(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  userControllers.updateUserById
);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - admin
 *     description: Delete an user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Deleted user successfully
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Permission denied
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  userControllers.deleteUserById
);

/**
 * @openapi
 * /api/users:
 *   delete:
 *     tags:
 *       - user
 *     description: Delete profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted user successfully
 *       401:
 *         description: Invalid token
 *       500:
 *         description: Internal server error
 */

router.delete("/", authenticate, userControllers.deleteUser);

module.exports = router;
