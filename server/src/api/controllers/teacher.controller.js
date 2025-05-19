const teacherService = require("../services/teacher.service");

module.exports.getTeachers = async (req, res) => {
  try {
    const teachers = await teacherService.getTeachers();
    return res.status(200).json({
      status: "success",
      data: teachers,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports.getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await teacherService.getTeacherById(id);
    if (!teacher) {
      return res.status(404).json({
        status: "error",
        message: "Teacher not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: teacher,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
module.exports.createTeacher = async (req, res) => {
  try {
    const { full_name, phone, email, degree_id, faculty_id } = req.body;
    const newTeacher = await teacherService.createTeacher(
      full_name,
      phone,
      email,
      degree_id,
      faculty_id
    );
    return res.status(201).json({
      status: "success",
      data: newTeacher,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
module.exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, phone, email, degree_id, faculty_id } = req.body;
    const updatedTeacher = await teacherService.updateTeacher(
      id,
      full_name,
      phone,
      email,
      degree_id,
      faculty_id
    );
    if (!updatedTeacher) {
      return res.status(404).json({
        status: "error",
        message: "Teacher not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: updatedTeacher,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
module.exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeacher = await teacherService.deleteTeacher(id);
    if (!deletedTeacher) {
      return res.status(404).json({
        status: "error",
        message: "Teacher not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
