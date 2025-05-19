const facultyControllers = require('..//controllers/faculty.controller');
const express = require('express');
const router = express.Router();

/**
 * @openapi
 * /api/faculties:
 *   get:
 *     tags:
 *       - Faculties
 *     description: Get all faculties
 *     summary:
 *       - Get all faculties
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all faculties successfully
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Permission denied
 *       500:
 *         description: Internal server error
 */
router.get("/", facultyControllers.getFaculties);

/**
 * @openapi
 * /api/faculties/{id}:
 *   get:
 *     tags:
 *       - Faculties
 *     description: Get all faculties
 *     summary:
 *       - Get falculty by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: faculty ID
 *     responses:
 *       200:
 *         description: Get a facultys successfully
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Permission denied
 *       500:
 *         description: Internal server error
 */
router.get("/:id", facultyControllers.getFacultyById);

/**
 * @openapi
 * /api/faculties:
 *   post:
 *     tags:
 *       - Faculties
 *     description: Create faculty
 *     summary:
 *      - Create faculty
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
 *         description: Create faculty successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", facultyControllers.createFaculty);

/**
 * @openapi
 * /api/faculties/{id}:
 *   put:
 *     tags:
 *       - Faculties
 *     description: Update personal information
 *     summary:
 *      - Update faculty
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Faculty ID
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
 *         description: Update faculty successfully
 *       500:
 *         description: Internal server error
 */
router.put("/:id", facultyControllers.updateFaculty);
/**
 * @openapi
 * /api/faculties/{id}:
 *   delete:
 *     tags:
 *       - Faculties
 *     description: Delete an faculty
 *     summary:
 *     - Delete faculty
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Faculty ID
 *     responses:
 *       200:
 *         description: Deleted faculty successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", facultyControllers.deleteFaculty);

module.exports = router;