import { StatusCodes } from "http-status-codes";
import { logger } from "@/server";
import type { Teacher } from "@/api/teacher/teacher.model";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { TeacherRepository } from "./teacher.repository";

export class TeacherService {
    private teacherRepository: TeacherRepository;

    constructor(repository: TeacherRepository = new TeacherRepository()) {
        this.teacherRepository = repository;
    }

    async getAllTeachers(): Promise<ServiceResponse<Teacher[] | null>> {
        try {
            const result = await this.teacherRepository.getAllTeachers();
            if (!result || result.length === 0) {
                return ServiceResponse.failure(
                    "No teachers found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            return ServiceResponse.success<Teacher[]>("Teachers found", result);
        } catch (error) {
            const errorMessage = `Error finding all teachers: $${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while retrieving teachers.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getTeacherById(id: number): Promise<ServiceResponse<Teacher | null>> {
        try {
            const result = await this.teacherRepository.getTeacherBy("id", id);
            if (!result) {
                logger.error("Teacher not found!");
                return ServiceResponse.failure(
                    "Teacher not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            return ServiceResponse.success<Teacher>("Teacher found", result);
        } catch (ex) {
            const errorMessage = `Error finding teacher with id ${id}:, ${(ex as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while finding teacher.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async createTeacher(
        user_id: number,
        degree_id: number,
        faculty_id: number
    ): Promise<ServiceResponse<number | null>> {
        try {
            const teacherExists = await this.teacherRepository.isTeacherExists(
                "id",
                user_id
            );
            if (teacherExists) {
                logger.error("Teacher with this user_id already exists!");
                return ServiceResponse.failure(
                    "Teacher with this user_id already exists!",
                    null,
                    StatusCodes.CONFLICT
                );
            }
            const id = await this.teacherRepository.createTeacher(
                user_id,
                degree_id,
                faculty_id,
            );
            return ServiceResponse.success<number>(
                "Teacher created successfully",
                id
            );
        } catch (error) {
            const errorMessage = `Error creating teacher: ${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while creating teacher.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async updateTeacher(
        id: number,
        degree_id: number,
        faculty_id: number
    ): Promise<ServiceResponse<number | null>> {
        try {
            const teacherExists = await this.teacherRepository.getTeacherBy("id", id);
            if (!teacherExists) {
                logger.error("Teacher not found for update!");
                return ServiceResponse.failure(
                    "Teacher not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }

            const result = await this.teacherRepository.updateTeacher(
                id,
                degree_id,
                faculty_id
            );
            return ServiceResponse.success<number>(
                "Teacher updated successfully",
                result
            );
        } catch (error) {
            const errorMessage = `Error updating teacher with id ${id}: ${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while updating teacher.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async deleteTeacher(id: number): Promise<ServiceResponse<number | null>> {
        try {
            const teacherExists = await this.teacherRepository.getTeacherBy("id", id);
            if (!teacherExists) {
                logger.error("Teacher not found for deletion!");
                return ServiceResponse.failure(
                    "Teacher not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }

            const result = await this.teacherRepository.deleteTeacher(id);
            return ServiceResponse.success<number>(
                "Teacher deleted successfully",
                result
            );
        } catch (error) {
            const errorMessage = `Error deleting teacher with id ${id}: ${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while deleting teacher.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}
export const teacherService = new TeacherService();
