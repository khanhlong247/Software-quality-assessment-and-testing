import type { User } from "@/api/user/user.model";
import db from "../configs/database";

export class UserRepository {
	async getAllUsers(): Promise<User[]> {
		const result = await db("users").select("*");
		return result;
	}

	async createUser(
		full_name: string,
		email: string,
		hash_password: string,
		role: string
	): Promise<number> {
		const [id] = await db("users").insert({
			full_name,
			email,
			hash_password,
			role,
		});
		return id;
	}

	async updateUser(id: number, full_name: string, phone: string, email: string): Promise<number> {
		const result = await db("users").where({ id }).update({ full_name });
		return result;
	}

	async updatePassword(email: string, hash_password: string): Promise<number> {
		const result = await db("users").where({ email }).update({ hash_password });
		return result;
	}

	async deleteUser(id: number): Promise<number> {
		return await db("users").where({ id }).del();
	}

	async isUserExists(
		field: "id" | "email",
		value: string | number
	): Promise<boolean> {
		const exists = await db("users")
			.where({ [field]: value })
			.first();
		return !!exists;
	}


	async getUserBy(
		field: "id" | "phone" | "email" | "full_name",
		value: string | number
	): Promise<User | null> {
		const result = await db("users")
			.where({ [field]: value })
			.first();
		return result;
	}
}
