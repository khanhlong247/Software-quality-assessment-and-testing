const db = require("../configs/db");

module.exports.getDegrees = async () => {
  const degrees = await db("degrees").select("*");
  return degrees;
};

module.exports.getDegreeById = async (id) => {
  const degree = await db("degrees").where({ id }).first();
  return degree;
};
module.exports.createDegree = async (full_name, short_name, salary_grade) => {
  const [newDegree] = await db("degrees").insert(
    full_name,
    short_name,
    salary_grade
  );
  return newDegree;
};

module.exports.updateDegree = async (
  id,
  full_name,
  short_name,
  salary_grade
) => {
  const [updatedDegree] = await db("degrees")
    .where({ id })
    .update(full_name, short_name, salary_grade);
  return updatedDegree;
};
module.exports.deleteDegree = async (id) => {
  const deletedDegree = await db("degrees").where({ id }).del();
  return deletedDegree;
};
