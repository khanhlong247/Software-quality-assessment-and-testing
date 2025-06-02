import { StatusCodes } from "http-status-codes";
import { logger } from "@/server";
import type { Faculty } from "@/api/faculty/faculty.model";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { FacultyRepository } from "./faculty.repository";

export class FacultyService {
    private facultyRepository: FacultyRepository;

    constructor(repository: FacultyRepository = new FacultyRepository()) {
        this.facultyRepository = repository;
    }

    async getAllFaculties(): Promise<ServiceResponse<Faculty[] | null>> {
        try {
            const result = await this.facultyRepository.getAllFaculties();
            if (!result || result.length === 0) {
                return ServiceResponse.failure(
                    "No faculties found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            return ServiceResponse.success<Faculty[]>("Faculties found", result);
        } catch (error) {
            const errorMessage = `Error finding all faculties: $${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while retrieving faculties.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getFacultyById(id: number): Promise<ServiceResponse<Faculty | null>> {
        try {
            const result = await this.facultyRepository.getFacultyBy("id", id);
            if (!result) {
                logger.error("Faculty not found!");
                return ServiceResponse.failure(
                    "Faculty not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            return ServiceResponse.success<Faculty>("Faculty found", result);
        } catch (ex) {
            const errorMessage = `Error finding faculty with id ${id}:, ${(ex as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while finding faculty.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async createFaculty(
        full_name: string,
        short_name: string,
        description: string
    ): Promise<ServiceResponse<number | null>> {
        try {
            const sname_exists = await this.facultyRepository.isFacultyExists(
                "short_name",
                short_name
            );
            const fname_exists = await this.facultyRepository.isFacultyExists(
                "full_name",
                full_name
            );
            if (sname_exists || fname_exists) {
                logger.error("Faculty already exists!");
                return ServiceResponse.failure(
                    "Faculty with full_name/ short_name already exists!",
                    null,
                    StatusCodes.CONFLICT
                );
            }

            const id = await this.facultyRepository.createFaculty(
                full_name,
                short_name,
                description
            );
            return ServiceResponse.success(
                "Faculty created",
                id,
                StatusCodes.CREATED
            );
        } catch (error) {
            const errorMessage = `Error creating faculty:, ${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while creating faculty.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async updateFaculty(
        id: number,
        full_name: string,
        short_name: string,
        description: string
    ): Promise<ServiceResponse<number | null>> {
        try {
            const exists = await this.facultyRepository.getFacultyBy("id", id);
            if (!exists) {
                logger.error("Faculty not found!");
                return ServiceResponse.failure(
                    "Faculty not found!",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            const sname_exists = await this.facultyRepository.getFacultyBy(
                "short_name",
                short_name
            );
            const fname_exists = await this.facultyRepository.getFacultyBy(
                "full_name",
                full_name
            );
            if (sname_exists && sname_exists.id !== id) {
                logger.error("Faculty with this short name already exists!");
                return ServiceResponse.failure(
                    "Faculty with this short name already exists!",
                    null,
                    StatusCodes.CONFLICT
                );
            }
            if (fname_exists && fname_exists.id !== id) {
                logger.error("Faculty with this full name already exists!");
                return ServiceResponse.failure(
                    "Faculty with this full name already exists!",
                    null,
                    StatusCodes.CONFLICT
                );
            }
            const result = await this.facultyRepository.updateFaculty(
                id,
                full_name,
                short_name,
                description
            );
            return ServiceResponse.success("Faculty updated", result);
        } catch (error) {
            const errorMessage = `Error updating faculty:, ${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while updating faculty.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async deleteFaculty(id: number): Promise<ServiceResponse<number | null>> {
        try {
            const user = await this.facultyRepository.isFacultyExists("id", id);
            if (!user) {
                logger.error("Faculty not found!");
                return ServiceResponse.failure(
                    "Faculty not found!.",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            const result = await this.facultyRepository.deleteFaculty(id);
            return ServiceResponse.success("Faculty deleted", result);
        } catch (error) {
            const errorMessage = `Error deleting faculty:, ${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while deleting faculty.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}
export const facultyService = new FacultyService();
