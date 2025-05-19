const degreeService = require("../services/degree.service");

module.exports.getDegrees = async (req, res) => {
  try {
    const degrees = await degreeService.getDegrees();
    res.status(200).json(degrees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching degrees", error });
  }
};
module.exports.getDegreeById = async (req, res) => {
  const { id } = req.params;
  try {
    const degree = await degreeService.getDegreeById(id);
    if (!degree) {
      return res.status(404).json({ message: "Degree not found" });
    }
    res.status(200).json(degree);
  } catch (error) {
    res.status(500).json({ message: "Error fetching degree", error });
  }
};
module.exports.createDegree = async (req, res) => {
  const { full_name, short_name, salary_grade } = req.body;
  try {
    const newDegree = await degreeService.createDegree(
      full_name,
      short_name,
      salary_grade
    );
    res.status(201).json(newDegree);
  } catch (error) {
    res.status(500).json({ message: "Error creating degree", error });
  }
};
module.exports.updateDegree = async (req, res) => {
  const { id } = req.params;
  const { full_name, short_name, salary_grade } = req.body;
  try {
    const updatedDegree = await degreeService.updateDegree(
      id,
      full_name,
      short_name,
      salary_grade
    );
    if (!updatedDegree) {
      return res.status(404).json({ message: "Degree not found" });
    }
    res.status(200).json(updatedDegree);
  } catch (error) {
    res.status(500).json({ message: "Error updating degree", error });
  }
};
module.exports.deleteDegree = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDegree = await degreeService.deleteDegree(id);
    if (!deletedDegree) {
      return res.status(404).json({ message: "Degree not found" });
    }
    res.status(200).json({ message: "Degree deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting degree", error });
  }
};
