import db from "../configs/database";
import type { Teacher } from "@/api/teacher/teacher.model";

export class TeacherRepository {
    async getAllTeachers(): Promise<Teacher[]> {
        const result = await db("teachers as t")
            .join("users as u", "t.user_id", "u.id")
            .join("degrees as d", "t.degree_id", "d.id")
            .join("faculty as f", "t.faculty_id", "f.id")
            .select(
                "t.id",
                "u.full_name",
                "u.email",
                "u.phone",
                "d.full_name as degree",
                "f.full_name as faculty"
            );
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
        const exists = await db("teachers")
            .join("users", "teachers.user_id", "users.id")
            .where({ [`users.${field}`]: value })
            .first();
        return !!exists;
    }
    async getTeacherBy(
        field: "phone" | "email",
        value: string | number
    ): Promise<Teacher | null> {
        const result = await db("teachers")
            .join("users", "teachers.user_id", "users.id")
            .where({ [`users.${field}`]: value })
            .first();
        return result;
    }

    async getTeacherById(id: number): Promise<Teacher | null> {
        const result = await db("teachers as t")
            .join("users as u", "t.user_id", "u.id")
            .join("degrees as d", "t.degree_id", "d.id")
            .join("faculty as f", "t.faculty_id", "f.id")
            .select(
                "t.id",
                "u.full_name",
                "u.email",
                "u.phone",
                "d.full_name as degree",
                "f.full_name as faculty"
            )
            .where("t.id", id)
            .first();
        return result;
    }
}
