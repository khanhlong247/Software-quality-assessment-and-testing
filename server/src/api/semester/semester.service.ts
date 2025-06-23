import { StatusCodes } from "http-status-codes";
import { logger } from "@/server";
import type { Semester } from "@/api/semester/semester.model";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { SemesterRepository } from "@/api/semester/semester.repository";

export class SemesterService {
    private semesterRepository: SemesterRepository;

    constructor(repository: SemesterRepository = new SemesterRepository()) {
        this.semesterRepository = repository;
    }

    async getAllSemesters(): Promise<ServiceResponse<Semester[] | null>> {
        try {
            const result = await this.semesterRepository.getAllSemesters();
            if (!result || result.length === 0) {
                return ServiceResponse.failure(
                    "No Semesters found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            return ServiceResponse.success<Semester[]>("Semesters found", result);
        } catch (error) {
            const errorMessage = `Error finding all semesters: $${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while retrieving semesters.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getSemesterById(id: number): Promise<ServiceResponse<Semester | null>> {
        try {
            const result = await this.semesterRepository.getSemesterBy("id", id);
            if (!result) {
                logger.error("Semester not found!");
                return ServiceResponse.failure(
                    "Semester not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            return ServiceResponse.success<Semester>("Semester found", result);
        } catch (ex) {
            const errorMessage = `Error finding semester with id ${id}:, ${(ex as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while finding semester.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async createSemester(
        name: string,
        start_year: number,
        start_date: Date,
        end_date: Date
    ): Promise<ServiceResponse<number | null>> {
        try {

            const result = await this.semesterRepository.createSemester(
                name,
                start_year,
                start_date,
                end_date
            );

            return ServiceResponse.success<number>(
                "Semester created successfully",
                result
            );
        } catch (error) {
            const errorMessage = `Error creating semester: $${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while creating semester.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async updateSemester(
        id: number,
        name: string,
        start_year: number,
        start_date: Date,
        end_date: Date
    ): Promise<ServiceResponse<number | null>> {
        try {
            const exists = await this.semesterRepository.isSemesterExists("id", id);
            if (!exists) {
                logger.error("Semester not found!");
                return ServiceResponse.failure(
                    "Semester not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }

            const result = await this.semesterRepository.updateSemester(
                id,
                name,
                start_year,
                start_date,
                end_date
            );
            return ServiceResponse.success<number>(
                "Semester updated successfully",
                result
            );
        } catch (error) {
            const errorMessage = `Error updating semester with id ${id}: $${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while updating semester.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async deleteSemester(id: number): Promise<ServiceResponse<number | null>> {
        try {
            const exists = await this.semesterRepository.isSemesterExists("id", id);
            if (!exists) {
                logger.error("Semester not found!");
                return ServiceResponse.failure(
                    "Semester not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            const result = await this.semesterRepository.deleteSemester(id);
            return ServiceResponse.success<number>(
                "Semester deleted successfully",
                result
            );
        } catch (error) {
            const errorMessage = `Error deleting semester with id ${id}: $${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while deleting semester.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

export const semesterService = new SemesterService();
