import db from "../configs/database";
import type { Teacher } from "@/api/teacher/teacher.model";

export class TeacherRepository {
    async getAllTeachers(): Promise<Teacher[]> {
        const result = await db("teachers").select("*");
        return result;
    }

    async createTeacher(
        user_id: number,
        degree_id: number,
        faculty_id: number
    ): Promise<number> {
        const [id] = await db("teachers").insert({
            user_id,
            degree_id,
            faculty_id,
        });
        return id;
    }

    async updateTeacher(
        id: number,
        degree_id: number,
        faculty_id: number
    ): Promise<number> {
        const result = await db("teachers")
            .where({ id })
            .update({ degree_id, faculty_id });
        return result;
    }

    async deleteTeacher(id: number): Promise<number> {
        return await db("teachers").where({ id }).del();
    }

    async isTeacherExists(
        field: "id" | "phone" | "email",
        value: string | number
    ): Promise<boolean> {
        const exists = await db("teacher as t")
            .join("user as u", "t.user_id", "u.id")
            .where({ [`u.${field}`]: value })
            .first();
        return !!exists;
    }
    async getTeacherBy(
        field: "id" | "phone" | "email",
        value: string | number
    ): Promise<Teacher | null> {
        const result = await db("teacher")
            .join("user as u", "t.user_id", "u.id")
            .where({ [`u.${field}`]: value })
            .first();
        return result;
    }
}
