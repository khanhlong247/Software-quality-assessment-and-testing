const teacherControllers = require("../controllers/teacher.controller");
const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /api/teachers:
 *   get:
 *     tags:
 *       - Teacher
 *     description: Get all teachers
 *     summary:
 *      - Get all teachers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all teachers successfully
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Permission denied
 *       500:
 *         description: Internal server error
 */
router.get("/", teacherControllers.getTeachers);

/**
 * @openapi
 * /api/teachers/{id}:
 *   get:
 *     tags:
 *       - Teacher
 *     description: Get teacher by ID
 *     summary:
 *      - Get teacher by ID
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
 *         description: Get a teacher successfully
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Permission denied
 *       500:
 *         description: Internal server error
 */
router.get("/:id", teacherControllers.getTeacherById);

/**
 * @openapi
 * /api/teachers:
 *   post:
 *     tags:
 *       - Teacher
 *     description: Create teacher
 *     summary:
 *     - Create teacher
 *     requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          full_name:
 *                              description: full name
 *                              type: string
 *                          phone:
 *                              description: phone
 *                              type: number
 *                          email:
 *                             description: email
 *                             type: string
 *                          degree_id:
 *                             description: degree id
 *                             type: number
 *                          faculty_id:
 *                             description: degree id
 *                             type: number
 *     responses:
 *       201:
 *         description: Create teacher successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", teacherControllers.createTeacher);

/**
 * @openapi
 * /api/degrees/{id}:
 *   put:
 *     tags:
 *       - Degree
 *     description: Update personal information
 *     summary:
 *     - Update teacher
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
 *     requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          full_name:
 *                              description: full name
 *                              type: string
 *                          phone:
 *                              description: phone
 *                              type: number
 *                          email:
 *                             description: email
 *                             type: string
 *                          degree_id:
 *                             description: degree id
 *                             type: number
 *                          faculty_id:
 *                             description: degree id
 *                             type: number
 *     responses:
 *       201:
 *         description: Update teacher successfully
 *       500:
 *         description: Internal server error
 */
router.put("/:id", teacherControllers.updateTeacher);
/**
 * @openapi
 * /api/teachers/{id}:
 *   delete:
 *     tags:
 *       - Teacher
 *     description: Delete teacher
 *     summary:
 *     - Delete teacher
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Deleted teacher successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", teacherControllers.deleteTeacher);

module.exports = router;
