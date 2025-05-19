const express = require("express");
const router = express.Router();
const degreeControllers = require("../controllers/degree.controller");
/**
 * @openapi
 * /api/degrees:
 *   get:
 *     tags:
 *       - Degree
 *     description: Get all degrees
 *     summary:
 *      - Get all degrees
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all degrees successfully
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Permission denied
 *       500:
 *         description: Internal server error
 */
router.get("/", degreeControllers.getDegrees);

/**
 * @openapi
 * /api/degrees/{id}:
 *   get:
 *     tags:
 *       - Degree
 *     description: Get all degrees
 *     summary:
 *     - Get degree by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Degree ID
 *     responses:
 *       200:
 *         description: Get a degree successfully
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Permission denied
 *       500:
 *         description: Internal server error
 */
router.get("/:id", degreeControllers.getDegreeById);

/**
 * @openapi
 * /api/degrees:
 *   post:
 *     tags:
 *       - Degree
 *     description: Create degree
 *     summary:
 *      - Create degree
 *     requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          full_name:
 *                              description: full name
 *                              type: string
 *                          short_name:
 *                              description: short name
 *                              type: string
 *                          salary_grade:
 *                              description: salary grade
 *                              type: decimal
 *     responses:
 *       201:
 *         description: Create degree successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", degreeControllers.createDegree);

/**
 * @openapi
 * /api/degrees/{id}:
 *   put:
 *     tags:
 *       - Degree
 *     description: Update personal information
 *     summary:
 *     - Update degree
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Degree ID
 *     requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          full_name:
 *                              description: full name
 *                              type: string
 *                          short_name:
 *                              description: short name
 *                              type: string
 *                          salary_grade:
 *                              description: salary grade
 *                              type: decimal
 *     responses:
 *       201:
 *         description: Update degree successfully
 *       500:
 *         description: Internal server error
 */
router.put("/:id", degreeControllers.updateDegree);
/**
 * @openapi
 * /api/degrees/{id}:
 *   delete:
 *     tags:
 *       - Degree
 *     description: Delete an user
 *     summary:
 *     - Delete degree
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Degree ID
 *     responses:
 *       200:
 *         description: Deleted degree successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", degreeControllers.deleteDegree);

module.exports = router;
