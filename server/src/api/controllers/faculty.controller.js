const facultyServices = require('../services/faculty.service');

module.exports.getFaculties = async (req, res) => {
  try {
    const faculties = await facultyServices.getFaculties();
    return res.status(200).json({
      status: 'success',
      data: faculties,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
}
module.exports.getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await facultyServices.getFacultyById(id);
    if (!faculty) {
      return res.status(404).json({
        status: 'error',
        message: 'Faculty not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: faculty,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
}
module.exports.createFaculty = async (req, res) => {
  try {
    const { full_name, short_name, description } = req.body;
    const newFaculty = await facultyServices.createFaculty(full_name, short_name, description);
    return res.status(201).json({
      status: 'success',
      data: newFaculty,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
}
module.exports.updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, short_name, description } = req.body;
    const updatedFaculty = await facultyServices.updateFaculty(id, full_name, short_name, description);
    if (!updatedFaculty) {
      return res.status(404).json({
        status: 'error',
        message: 'Faculty not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: updatedFaculty,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
}
module.exports.deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFaculty = await facultyServices.deleteFaculty(id);
    if (!deletedFaculty) {
      return res.status(404).json({
        status: 'error',
        message: 'Faculty not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Faculty deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
}
