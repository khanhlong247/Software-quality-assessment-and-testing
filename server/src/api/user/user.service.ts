import { StatusCodes } from "http-status-codes";
import { logger } from "@/server";
import type { User } from "@/api/user/user.model";
import { UserRepository } from "@/api/user/user.repository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { hashPassword, checkPassword } from "@/common/utils/passwordHandlers";

export class UserService {
	private userRepository: UserRepository;

	constructor(repository: UserRepository = new UserRepository()) {
		this.userRepository = repository;
	}

	async getAllUsers(): Promise<ServiceResponse<User[] | null>> {
		try {
			const users = await this.userRepository.getAllUsers();
			if (!users || users.length === 0) {
				return ServiceResponse.failure(
					"No Users found",
					null,
					StatusCodes.NOT_FOUND
				);
			}
			return ServiceResponse.success<User[]>("Users found", users);
		} catch (ex) {
			const errorMessage = `Error finding all users: $${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while retrieving users.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}

	async getUserById(id: number): Promise<ServiceResponse<User | null>> {
		try {
			const user = await this.userRepository.getUserBy("id", id);
			if (!user) {
				logger.error("User not found!");
				return ServiceResponse.failure(
					"User not found",
					null,
					StatusCodes.NOT_FOUND
				);
			}
			return ServiceResponse.success<User>("User found", user);
		} catch (ex) {
			const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message
				}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while finding user.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}

	async getMyself(req: Request): Promise<ServiceResponse<User | null>> {
		try {
			const userId = (req as any).user?.id;

			if (!userId) {
				return ServiceResponse.failure(
					"User not authenticated",
					null,
					StatusCodes.UNAUTHORIZED
				);
			}

			const user = await this.userRepository.getUserBy("id", userId);
			if (!user) {
				logger.error("User not found!");
				return ServiceResponse.failure(
					"User not found",
					null,
					StatusCodes.NOT_FOUND
				);
			}
			return ServiceResponse.success<User>("User found", user);
		} catch (ex) {
			const errorMessage = `Error finding user, ${(ex as Error).message
				}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while finding user.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}

	async createUser(
		full_name: string,
		email: string,
		plain_password: string,
		role: string
	): Promise<ServiceResponse<number | null>> {
		try {
			const emailExists = await this.userRepository.isUserExists(
				"email",
				email
			);
			if (emailExists) {
				logger.error("User with email already exists!");
				return ServiceResponse.failure(
					"User with email already exists!",
					null,
					StatusCodes.CONFLICT
				);
			}

			const hash_password = await hashPassword(plain_password);
			const id = await this.userRepository.createUser(
				full_name,
				email,
				hash_password,
				role
			);
			return ServiceResponse.success("User created", id, StatusCodes.CREATED);
		} catch (error) {
			const errorMessage = `Error creating user:, ${(error as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while creating user.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}

	async changePassword(
		email: string,
		current_password: string,
		new_password: string
	): Promise<ServiceResponse<number | null>> {
		try {
			const user = await this.userRepository.getUserBy("email", email);
			if (!user) {
				logger.error("User not found for password change!");
				return ServiceResponse.failure(
					"User not found",
					null,
					StatusCodes.NOT_FOUND
				);
			}

			const isPasswordValid = await checkPassword(
				current_password,
				user.hash_password
			);
			if (!isPasswordValid) {
				logger.error("Current password is incorrect!");
				return ServiceResponse.failure(
					"Current password is incorrect",
					null,
					StatusCodes.UNAUTHORIZED
				);
			}

			const hash_password = await hashPassword(new_password);
			const result = await this.userRepository.changePassword(
				user.email,
				hash_password
			);
			return ServiceResponse.success<number>(
				"Password changed successfully",
				result
			);
		} catch (error) {
			const errorMessage = `Error changing password:, ${(error as Error).message
				}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while changing password.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}
	async updateUser(
		id: number,
		full_name: string,
		phone: string
	): Promise<ServiceResponse<number | null>> {
		try {
			const isUserExists = await this.userRepository.getUserBy("id", id);
			if (!isUserExists) {
				logger.error("User not found for update!");
				return ServiceResponse.failure(
					"User not found",
					null,
					StatusCodes.NOT_FOUND
				);
			}

			console.log(phone);
			const phoneExists = await this.userRepository.getUserBy("phone", phone);
			if (phoneExists && phoneExists.id !== id) {
				logger.error(`Phone number ${phone} already exists for another user!`);
				return ServiceResponse.failure(
					"Phone number already exists",
					null,
					StatusCodes.CONFLICT
				);
			}

			const result = await this.userRepository.updateUser(id, full_name, phone);
			return ServiceResponse.success<number>(
				"User updated successfully",
				result
			);
		} catch (error) {
			const errorMessage = `Error updating user:, ${(error as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while updating user.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}

	async deleteUser(id: number): Promise<ServiceResponse<number | null>> {
		try {
			const user = await this.userRepository.isUserExists("id", id);
			if (!user) {
				logger.error("User not found!");
				return ServiceResponse.failure(
					"User not found!.",
					null,
					StatusCodes.NOT_FOUND
				);
			}
			const result = await this.userRepository.deleteUser(id);
			return ServiceResponse.success("User deleted", result);
		} catch (error) {
			const errorMessage = `Error deleting user:, ${(error as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while deleting user.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}
}

export const userService = new UserService();
