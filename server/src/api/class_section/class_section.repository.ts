import db from "../configs/database";
import type { Teacher } from "@/api/teacher/teacher.model";

export class ClassSectionRepository {
  async getAllClassSections(): Promise<Teacher[]> {
    const result = await db("classes").select("*");
    return result;
  }
  async getAllClassSectionsDetails() {
    const result = await db("classes as c")
      .leftJoin("teachers as t", "c.teacher_id", "t.id")
      .leftJoin("users as u", "t.user_id", "u.id")
      .join("courses as cou", "c.course_id", "cou.id")
      .join("semesters as s", "c.semester_id", "s.id")
      .select(
        "c.id as id",
        "c.full_name as full_name",
        "c.total_students as total_students",
        "cou.name as course_id",
        "s.name as semester_id",
        "u.full_name as teacher_id",
        "c.grade as grade",
        "s.start_year as start_year"
      );
    return result;
  }

  async createClassSection(
    full_name: string,
    total_students: number,
    course_id: number,
    semester_id: number,
    teacher_id: number,
    grade: number
  ): Promise<number> {
    const [id] = await db("classes").insert({
      full_name,
      total_students,
      course_id,
      semester_id,
      teacher_id,
      grade,
    });
    return id;
  }

  async createMultipleClassSections(
    classes: {
      full_name: string;
      total_students: number;
      course_id: number;
      semester_id: number;
      grade: number;
    }[]
  ): Promise<number[]> {
    const result = await db("classes").insert(classes).returning("id");
    return result.map((row: any) => row.id);
  }

  async updateClassSection(
    id: number,
    full_name: string,
    total_students: number,
    course_id: number,
    semester_id: number,
    teacher_id: number,
    grade: number
  ): Promise<number> {
    const result = await db("classes").where({ id }).update({
      full_name,
      total_students,
      course_id,
      semester_id,
      teacher_id,
      grade,
    });
    return result;
  }

  async deleteClassSection(id: number): Promise<number> {
    return await db("classes").where({ id }).del();
  }
  async isClassSectionExists(
    field: "id" | "full_name",
    value: string | number
  ): Promise<boolean> {
    const exists = await db("classes")
      .where({ [field]: value })
      .first();
    return !!exists;
  }
  async getClassSectionBy(
    field: "id" | "full_name",
    value: string | number
  ): Promise<Teacher | null> {
    const result = await db("classes")
      .where({ [field]: value })
      .first();
    return result;
  }
}
