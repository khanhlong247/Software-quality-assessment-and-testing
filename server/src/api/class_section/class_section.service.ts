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
      const errorMessage = `Error finding all class sections: $${
        (error as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving class sections.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getAllClassSectionsDetails() {
    try {
      const result = await this.classSectionRepository.getAllClassSectionsDetails();
      if (!result || result.length === 0) {
        return ServiceResponse.failure(
          "No class sections found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success("Class sections found", result);
    } catch (error) {
      const errorMessage = `Error finding all class sections: $${
        (error as Error).message
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
      const errorMessage = `Error finding class section with id ${id}:, ${
        (ex as Error).message
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
      let grade = 1;
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

      if (total_students <= 200 && total_students > 150) {
        grade = 3.0;
      } else if (total_students <= 150 && total_students > 100) {
        grade = 2.5;
      } else if (total_students <= 100 && total_students > 50) {
        grade = 2.0;
      } else if (total_students <= 50 && total_students > 0) {
        grade = 1.5;
      } else {
        grade = 1.0;
      }

      const id = await this.classSectionRepository.createClassSection(
        full_name,
        total_students,
        course_id,
        semester_id,
        teacher_id,
        grade
      );
      return ServiceResponse.success<number>(
        "Class section created successfully",
        id
      );
    } catch (error) {
      const errorMessage = `Error creating class section: ${
        (error as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating class section.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createMultipleClassSections(
    name: string,
    total_students: number,
    course_id: number,
    semester_id: number,
    count: number
  ): Promise<ServiceResponse<number[] | null>> {
    try {
      const courseExists = await this.courseRepository.isCourseExists(
        "id",
        course_id
      );
      const semesterExists = await this.semesterRepository.isSemesterExists(
        "id",
        semester_id
      );

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

      let grade = 1;
      if (total_students <= 200 && total_students > 150) {
        grade = 3.0;
      } else if (total_students <= 150 && total_students > 100) {
        grade = 2.5;
      } else if (total_students <= 100 && total_students > 50) {
        grade = 2.0;
      } else if (total_students <= 50 && total_students > 0) {
        grade = 1.5;
      } else {
        grade = 1.0;
      }

      const classes = Array.from({ length: count }, (_, i) => ({
        full_name: `${name} (N0${i + 1})`,
        total_students,
        course_id,
        semester_id,
        grade,
      }));

      const ids = await this.classSectionRepository.createMultipleClassSections(
        classes
      );

      return ServiceResponse.success<number[]>(
        `${count} class sections created successfully`,
        ids
      );
    } catch (error) {
      const errorMessage = `Error creating multiple class sections: ${
        (error as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating class sections.",
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
      let grade = 1;

      console.log(
        "THIS IS DATA UPDATE >>>> ",
        "id",
        id,
        "full_name",
        full_name,
        "total_students",
        total_students,
        "course_id",
        course_id,
        "semester_id",
        semester_id,
        "teacher_id",
        teacher_id,
        "grade",
        grade
      );
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

      if (total_students <= 160 && total_students > 80) {
        grade = 0.4;
      } else if (total_students < 80 && total_students >= 70) {
        grade = 0.3;
      } else if (total_students < 70 && total_students >= 60) {
        grade = 0.2;
      } else if (total_students < 60 && total_students >= 50) {
        grade = 0.1;
      } else if (total_students < 50 && total_students >= 40) {
        grade = 0;
      } else if (total_students < 40 && total_students >= 30) {
        grade = -0.1;
      } else if (total_students < 30 && total_students >= 20) {
        grade = -0.2;
      } else {
        grade = -0.3;
      }

      const result = await this.classSectionRepository.updateClassSection(
        id,
        full_name,
        total_students,
        course_id,
        semester_id,
        teacher_id,
        grade
      );
      return ServiceResponse.success<number>(
        "Class section updated successfully",
        result
      );
    } catch (error) {
      const errorMessage = `Error updating class section: ${
        (error as Error).message
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
      const errorMessage = `Error deleting class section: ${
        (error as Error).message
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
