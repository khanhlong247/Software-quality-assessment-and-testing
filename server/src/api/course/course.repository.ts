import db from "../configs/database";
import type { Course } from "@/api/course/course.model";
export class CourseRepository {

    async getAllCourses(): Promise<Course[]> {
        const result = await db("courses").select("*");
        return result;
    }

    async createCourse(name: string, credit: number, coefficient: number, total_hour: number): Promise<number> {
        const [id] = await db("courses").insert({ name, credit, coefficient, total_hour });
        return id;
    }

    async updateCourse(id: number, name: string, credit: number, coefficient: number, total_hour: number): Promise<number> {
        const result = await db("courses").where({ id }).update({ name, credit, coefficient, total_hour });
        return result;
    }

    async deleteCourse(id: number): Promise<number> {
        return await db("courses").where({ id }).del();
    }

    async isCourseExists(field: "id" | "name", value: string | number): Promise<boolean> {
        const exists = await db("courses")
            .where({ [field]: value })
            .first();
        return !!exists;
    }

    async getCourseBy(field: "id" | "name", value: string | number): Promise<Course | null> {
        const result = await db("courses")
            .where({ [field]: value })
            .first();
        return result;
    }
}