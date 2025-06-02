import db from "../configs/database";
import type { Semester } from "@/api/semester/semester.model";

export class SemesterRepository {
    async getAllSemesters(): Promise<Semester[]> {
        const result = await db("semesters").select("*");
        return result;
    }

    async createSemester(name: string, start_year: number, start_date: Date, end_date: Date): Promise<number> {
        const [id] = await db("semesters").insert({ name, start_year, start_date, end_date });
        return id;
    }

    async updateSemester(id: number, name: string, start_year: number, start_date: Date, end_date: Date): Promise<number> {
        const result = await db("semesters").where({ id }).update({ name, start_year, start_date, end_date });
        return result;
    }

    async deleteSemester(id: number): Promise<number> {
        return await db("semesters").where({ id }).del();
    }

    async isSemesterExists(field: "id" | "name", value: string | number): Promise<boolean> {
        const exists = await db("semesters")
            .where({ [field]: value })
            .first();
        return !!exists;
    }

    async getSemesterBy(field: "id" | "name", value: string | number): Promise<Semester | null> {
        const result = await db("semesters")
            .where({ [field]: value })
            .first();
        return result;
    }

}