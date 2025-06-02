import db from "../configs/database";
import type { Degree } from "@/api/degree/degree.model";

export class DegreeRepository {
    async getAllDegrees(): Promise<Degree[]> {
        const result = await db("degrees").select("*");
        return result;
    }

    async createDegree(full_name: string, short_name: string, salary_grade: number): Promise<number> {
        const [id] = await db("degrees").insert({ full_name, short_name, salary_grade });
        return id;
    }

    async updateDegree(id: number, full_name: string, short_name: string, salary_grade: number): Promise<number> {
        const result = await db("degrees").where({ id }).update({ full_name, short_name, salary_grade });
        return result;
    }

    async deleteDegree(id: number): Promise<number> {
        return await db("degrees").where({ id }).del();
    }

    async isDegreeExists(field: "id" | "full_name" | "short_name", value: string | number): Promise<boolean> {
        const exists = await db("degrees")
            .where({ [field]: value })
            .first();
        return !!exists;
    }

    async getDegreeBy(field: "id" | "full_name" | "short_name", value: string | number): Promise<Degree | null> {
        const result = await db("degrees")
            .where({ [field]: value })
            .first();
        return result;
    }
}