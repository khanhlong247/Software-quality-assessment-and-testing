import { StatusCodes } from "http-status-codes";
import { logger } from "@/server";
import type { Degree } from "@/api/degree/degree.model";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { DegreeRepository } from "@/api/degree/degree.repository";

export class DegreeService {
    private degreeRepository: DegreeRepository;

    constructor(repository: DegreeRepository = new DegreeRepository()) {
        this.degreeRepository = repository;
    }

    async getAllDegrees(): Promise<ServiceResponse<Degree[] | null>> {
        try {
            const result = await this.degreeRepository.getAllDegrees();
            if (!result || result.length === 0) {
                return ServiceResponse.failure(
                    "No Degrees found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            return ServiceResponse.success<Degree[]>("Degrees found", result);
        } catch (error) {
            const errorMessage = `Error finding all degrees: $${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while retrieving degrees.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getDegreeById(id: number): Promise<ServiceResponse<Degree | null>> {
        try {
            const result = await this.degreeRepository.getDegreeBy("id", id);
            if (!result) {
                logger.error("Degree not found!");
                return ServiceResponse.failure(
                    "Degree not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            return ServiceResponse.success<Degree>("Degree found", result);
        } catch (error) {
            const errorMessage = `Error finding user with id ${id}:, ${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while finding user.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async createDegree(
        full_name: string,
        short_name: string,
        salary_grade: number
    ): Promise<ServiceResponse<number | null>> {
        try {
            const sname_exists = await this.degreeRepository.isDegreeExists(
                "short_name",
                short_name
            );
            const fname_exists = await this.degreeRepository.isDegreeExists(
                "full_name",
                full_name
            );
            if (sname_exists || fname_exists) {
                logger.error("Degree already exists!");
                return ServiceResponse.failure(
                    "Degree with full_name/ short_name already exists!",
                    null,
                    StatusCodes.CONFLICT
                );
            }

            const id = await this.degreeRepository.createDegree(
                full_name,
                short_name,
                salary_grade
            );
            return ServiceResponse.success("Degree created", id, StatusCodes.CREATED);
        } catch (error) {
            const errorMessage = `Error creating degree:, ${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while creating degree.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async updateDegree(
        id: number,
        full_name: string,
        short_name: string,
        salary_grade: number
    ): Promise<ServiceResponse<number | null>> {
        try {
            const exists = await this.degreeRepository.getDegreeBy("id", id);
            if (!exists) {
                logger.error("Degree not found!");
                return ServiceResponse.failure(
                    "Degree not found!",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            const sname_exists = await this.degreeRepository.getDegreeBy(
                "short_name",
                short_name
            );
            const fname_exists = await this.degreeRepository.getDegreeBy(
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

            const result = await this.degreeRepository.updateDegree(
                id,
                full_name,
                short_name,
                salary_grade
            );
            return ServiceResponse.success("Degree updated", result);
        } catch (error) {
            const errorMessage = `Error updating degree:, ${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while updating degree.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async deleteDegree(id: number): Promise<ServiceResponse<number | null>> {
        try {
            const user = await this.degreeRepository.isDegreeExists("id", id);
            if (!user) {
                logger.error("Degree not found!");
                return ServiceResponse.failure(
                    "Degree not found!.",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            const result = await this.degreeRepository.deleteDegree(id);
            return ServiceResponse.success("Degree deleted", result);
        } catch (error) {
            const errorMessage = `Error deleting degree:, ${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while deleting degree.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}
export const degreeService = new DegreeService();
