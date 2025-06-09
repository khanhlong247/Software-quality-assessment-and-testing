import { StatusCodes } from "http-status-codes";
import { logger } from "@/server";
import type { Teacher } from "@/api/teacher/teacher.model";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { ClassSectionRepository } from "./class_section.repository";
import { TeacherRepository } from "../teacher/teacher.repository";
import { CourseRepository } from "../course/course.repository";
import { SemesterRepository } from "../semester/semester.repository";

export class ClassSectionService {
    private classSectionRepository: ClassSectionRepository;
    private teacherRepository: TeacherRepository;
    private courseRepository: CourseRepository;
    private semesterRepository: SemesterRepository;

    constructor(
        repository: ClassSectionRepository = new ClassSectionRepository(),
        semesterRepo: SemesterRepository = new SemesterRepository(),
        courseRepo: CourseRepository = new CourseRepository(),
        teacherRepo: TeacherRepository = new TeacherRepository()
    ) {
        this.classSectionRepository = repository;
        this.semesterRepository = semesterRepo;
        this.courseRepository = courseRepo;
        this.teacherRepository = teacherRepo;
    }

    async getAllClassSections(): Promise<ServiceResponse<Teacher[] | null>> {
        try {
            const result = await this.classSectionRepository.getAllClassSections();
            if (!result || result.length === 0) {
                return ServiceResponse.failure(
                    "No class sections found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            return ServiceResponse.success<Teacher[]>("Class sections found", result);
        } catch (error) {
            const errorMessage = `Error finding all class sections: $${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while retrieving class sections.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getClassSectionById(
        id: number
    ): Promise<ServiceResponse<Teacher | null>> {
        try {
            const result = await this.classSectionRepository.getClassSectionBy(
                "id",
                id
            );
            if (!result) {
                logger.error("Class section not found!");
                return ServiceResponse.failure(
                    "Class section not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            return ServiceResponse.success<Teacher>("Class section found", result);
        } catch (ex) {
            const errorMessage = `Error finding class section with id ${id}:, ${(ex as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while finding class section.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async createClassSection(
        full_name: string,
        total_students: number,
        course_id: number,
        semester_id: number,
        teacher_id: number
    ): Promise<ServiceResponse<number | null>> {
        try {
            const courseExists = await this.courseRepository.isCourseExists(
                "id",
                course_id
            );
            const semesterExists = await this.semesterRepository.isSemesterExists(
                "id",
                semester_id
            );
            const teacherExists = await this.teacherRepository.getTeacherById(
                teacher_id
            );
            if (!teacherExists) {
                return ServiceResponse.failure(
                    "Teacher not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            if (!semesterExists) {
                return ServiceResponse.failure(
                    "Semester not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            if (!courseExists) {
                return ServiceResponse.failure(
                    "Course not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            const id = await this.classSectionRepository.createClassSection(
                full_name,
                total_students,
                course_id,
                semester_id,
                teacher_id
            );
            return ServiceResponse.success<number>(
                "Class section created successfully",
                id
            );
        } catch (error) {
            const errorMessage = `Error creating class section: ${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while creating class section.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async updateClassSection(
        id: number,
        full_name: string,
        total_students: number,
        course_id: number,
        semester_id: number,
        teacher_id: number
    ): Promise<ServiceResponse<number | null>> {
        try {
            const isExists = await this.classSectionRepository.isClassSectionExists(
                "id",
                id
            );
            const courseExists = await this.courseRepository.isCourseExists(
                "id",
                course_id
            );
            const semesterExists = await this.semesterRepository.isSemesterExists(
                "id",
                semester_id
            );
            const teacherExists = await this.teacherRepository.getTeacherById(
                teacher_id
            );
            if (!isExists) {
                return ServiceResponse.failure(
                    "Class section not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            if (!teacherExists) {
                return ServiceResponse.failure(
                    "Teacher not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            if (!semesterExists) {
                return ServiceResponse.failure(
                    "Semester not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            if (!courseExists) {
                return ServiceResponse.failure(
                    "Course not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            const result = await this.classSectionRepository.updateClassSection(
                id,
                full_name,
                total_students,
                course_id,
                semester_id,
                teacher_id
            );
            return ServiceResponse.success<number>(
                "Class section updated successfully",
                result
            );
        } catch (error) {
            const errorMessage = `Error updating class section: ${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while updating class section.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async deleteClassSection(
        id: number
    ): Promise<ServiceResponse<number | null>> {
        try {
            const isExists = await this.classSectionRepository.isClassSectionExists(
                "id",
                id
            );
            if (!isExists) {
                return ServiceResponse.failure(
                    "Class section not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            const result = await this.classSectionRepository.deleteClassSection(id);
            return ServiceResponse.success<number>(
                "Class section deleted successfully",
                result
            );
        } catch (error) {
            const errorMessage = `Error deleting class section: ${(error as Error).message
                }`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while deleting class section.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

export const classSectionService = new ClassSectionService();
