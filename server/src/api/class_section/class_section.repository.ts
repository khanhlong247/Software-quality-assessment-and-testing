import db from "../configs/database";
import type { Teacher } from "@/api/teacher/teacher.model";

export class ClassSectionRepository {
  async getAllClassSections(): Promise<Teacher[]> {
    const result = await db("classes").select("*");
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
