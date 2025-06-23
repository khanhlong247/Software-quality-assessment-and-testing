import { StatusCodes } from "http-status-codes";
import { logger } from "@/server";
import type { Teacher } from "@/api/teacher/teacher.model";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { TeacherRepository } from "./teacher.repository";
import { FacultyRepository } from "../faculty/faculty.repository";
import { DegreeRepository } from "../degree/degree.repository";
import { UserRepository } from "../user/user.repository";

export class TeacherService {
    private teacherRepository: TeacherRepository;
    private facultyRepository: FacultyRepository;
    private degreeRepository: DegreeRepository;
    private userRepository: UserRepository;
    constructor(
        repository: TeacherRepository = new TeacherRepository(),
        facultyRepository: FacultyRepository = new FacultyRepository(),
        degreeRepository: DegreeRepository = new DegreeRepository(),
        userRepository: UserRepository = new UserRepository()
    ) {
        this.teacherRepository = repository;
        this.facultyRepository = facultyRepository;
        this.degreeRepository = degreeRepository;
        this.userRepository = userRepository;
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
            const result = await this.teacherRepository.getTeacherById(id);
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
        user_id: string,
        degree_id: string,
        faculty_id: string
    ): Promise<ServiceResponse<number | null>> {
        try {
            const teacherExists = await this.teacherRepository.getTeacherById(
                Number(user_id)
            );
            const facultyExists = await this.facultyRepository.getFacultyBy(
                "id",
                faculty_id
            );
            const degreeExists = await this.degreeRepository.getDegreeBy(
                "id",
                degree_id
            );
            const userExists = await this.userRepository.isUserExists("id", user_id);
            if (!userExists) {
                logger.error("User not found!");
                return ServiceResponse.failure(
                    "User not found, can't assign teacher!",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            if (teacherExists) {
                logger.error("Teacher already exists!");
                return ServiceResponse.failure(
                    "Teacher with this id already exists!",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            if (!facultyExists) {
                logger.error("Faculty not found!");
                return ServiceResponse.failure(
                    "Faculty not found, can't asign teacher!",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }

            if (!degreeExists) {
                logger.error("Degree not found!");
                return ServiceResponse.failure(
                    "Degree not found, can't asign to teacher!",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            const id = await this.teacherRepository.createTeacher(
                Number(user_id),
                Number(degree_id),
                Number(faculty_id)
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
            const teacherExists = await this.teacherRepository.getTeacherById(id);
            const facultyExists = await this.facultyRepository.getFacultyBy(
                "id",
                faculty_id
            );
            const degreeExists = await this.degreeRepository.getDegreeBy(
                "id",
                degree_id
            );
            if (!teacherExists) {
                logger.error("Teacher not found for update!");
                return ServiceResponse.failure(
                    "Teacher not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            if (!facultyExists) {
                logger.error("Faculty not found!");
                return ServiceResponse.failure(
                    "Faculty not found, can't asign teacher!",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }

            if (!degreeExists) {
                logger.error("Degree not found!");
                return ServiceResponse.failure(
                    "Degree not found, can't asign to teacher!",
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
            const teacherExists = await this.teacherRepository.getTeacherById(id);
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
