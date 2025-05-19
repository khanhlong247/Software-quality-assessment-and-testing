const db = require("../configs/db");

module.exports.getFaculties = async () => {
  const faculties = await db("faculty").select("*");
  return faculties;
};

module.exports.getFacultyById = async (id) => {
  const faculty = await db("faculty").where({ id }).first();
  return faculty;
};
module.exports.createFaculty = async (full_name, short_name, description) => {
  const [newFaculty] = await db("faculty").insert(full_name, short_name, description);
  return newFaculty;
};

module.exports.updateFaculty = async (id, full_name, short_name, description) => {
  const [updatedFaculty] = await db("faculty").where({ id }).update(full_name, short_name, description);
  return updatedFaculty;
};
module.exports.deleteFaculty = async (id) => {
  const deletedFaculty = await db("faculty").where({ id }).del();
  return deletedFaculty;
};
