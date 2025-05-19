const db = require("../configs/db");

module.exports.getTeachers = async () => {
  const teachers = await db("teacher").select("*");
  return teachers;
};

module.exports.getTeacherById = async (id) => {
  const teacher = await db("teacher").where({ id }).first();
  return teacher;
};

module.exports.createTeacher = async (
  full_name,
  phone,
  email,
  degree_id,
  faculty_id
) => {
  const newTeacher = await db("teacher").insert({
    full_name,
    phone,
    email,
    degree_id,
    faculty_id,
  });
  return newTeacher;
};

module.exports.updateTeacher = async (
  id,
  full_name,
  phone,
  email,
  degree_id,
  faculty_id
) => {
  const updatedTeacher = await db("teacher")
    .where({ id })
    .update({
      full_name,
      phone,
      email,
      degree_id,
      faculty_id,
    });
  return updatedTeacher;
};
module.exports.deleteTeacher = async (id) => {
  const deletedTeacher = await db("teacher").where({ id }).del();
  return deletedTeacher;
};