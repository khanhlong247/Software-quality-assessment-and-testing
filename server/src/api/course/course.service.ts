import { StatusCodes } from "http-status-codes";
import { logger } from "@/server";
import type { Course } from "@/api/course/course.model";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { CourseRepository } from "./course.repository";

export class CourseService {
    private courseRepository: CourseRepository;

    constructor(repository: CourseRepository = new CourseRepository()) {
        this.courseRepository = repository;
    }

    async getAllCourses(): Promise<ServiceResponse<Course[] | null>> {
        try {
            const result = await this.courseRepository.getAllCourses();
            if (!result || result.length === 0) {
                return ServiceResponse.failure(
                    "No Courses found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            return ServiceResponse.success<Course[]>("Courses found", result);
        } catch (error) {
            const errorMessage = `Error finding all courses: $${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while retrieving courses.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getCourseById(id: number): Promise<ServiceResponse<Course | null>> {
        try {
            const result = await this.courseRepository.getCourseBy("id", id);
            if (!result) {
                logger.error("Course not found!");
                return ServiceResponse.failure(
                    "Course not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            return ServiceResponse.success<Course>("Course found", result);
        } catch (error) {
            const errorMessage = `Error finding course with id ${id}:, ${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while finding course.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async createCourse(
        name: string,
        credit: number,
        coefficient: number,
        total_hour: number
    ): Promise<ServiceResponse<number | null>> {
        try {
            const isExists = await this.courseRepository.isCourseExists("name", name);
            if (isExists) {
                return ServiceResponse.failure(
                    "Course with this name already exists",
                    null,
                    StatusCodes.CONFLICT
                );
            }
            const id = await this.courseRepository.createCourse(
                name,
                credit,
                coefficient,
                total_hour
            );
            return ServiceResponse.success<number>("Course created successfully", id);
        } catch (error) {
            const errorMessage = `Error creating course: $${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while creating course.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async updateCourse(
        id: number,
        name: string,
        credit: number,
        coefficient: number,
        total_hour: number
    ): Promise<ServiceResponse<number | null>> {
        try {
            const isExists = await this.courseRepository.isCourseExists("id", id);
            if (!isExists) {
                return ServiceResponse.failure(
                    "Course not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }

            const name_exists = await this.courseRepository.getCourseBy("name", name);
            if (name_exists && name_exists.id !== id) {
                logger.error("Course with name already exists!");
                return ServiceResponse.failure(
                    "Course with name already exists!",
                    null,
                    StatusCodes.CONFLICT
                );
            }
            const updatedId = await this.courseRepository.updateCourse(
                id,
                name,
                credit,
                coefficient,
                total_hour
            );
            return ServiceResponse.success<number>(
                "Course updated successfully",
                updatedId
            );
        } catch (error) {
            const errorMessage = `Error updating course: $${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while updating course.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async deleteCourse(id: number): Promise<ServiceResponse<number | null>> {
        try {
            const isExists = await this.courseRepository.isCourseExists("id", id);
            if (!isExists) {
                return ServiceResponse.failure(
                    "Course not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            const deletedId = await this.courseRepository.deleteCourse(id);
            return ServiceResponse.success<number>(
                "Course deleted successfully",
                deletedId
            );
        } catch (error) {
            const errorMessage = `Error deleting course: $${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while deleting course.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

export const courseService = new CourseService();