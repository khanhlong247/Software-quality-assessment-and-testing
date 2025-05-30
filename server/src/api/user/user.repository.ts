import type { User } from "@/api/user/user.model";
import db from "../configs/database";

export class UserRepository {
	async getAllUsers(): Promise<User[]> {
		const result = await db("users").select("*");
		return result;
	}

	async getUserById(id: number): Promise<User | null> {
		return await db("users").select("*").where({ id }).first();
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

	async updateUser(id: number, full_name: string): Promise<number> {
		const result = await db("users").where({ id }).update({ full_name });
		return result;
	}

	async updatePassword(id: number, hash_password: string): Promise<number> {
		const result = await db("users").where({ id }).update({ hash_password });
		return result;
	}

	async deleteUser(id: number): Promise<number> {
		return await db("users").where({ id }).del();
	}
}