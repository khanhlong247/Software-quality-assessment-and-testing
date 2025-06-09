import type { Request, RequestHandler, Response } from "express";
import { classSectionService } from "./class_section.service";

class ClassSectionController {
    public getAllClassSections: RequestHandler = async (
        _req: Request,
        res: Response
    ) => {
        const serviceResponse = await classSectionService.getAllClassSections();
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public getClassSectionById: RequestHandler = async (
        req: Request,
        res: Response
    ) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await classSectionService.getClassSectionById(id);
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public createClassSection: RequestHandler = async (
        req: Request,
        res: Response
    ) => {
        const { full_name, total_students, course_id, semester_id, teacher_id } =
            req.body;
        const serviceResponse = await classSectionService.createClassSection(
            full_name,
            total_students,
            course_id,
            semester_id,
            teacher_id
        );
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public updateClassSection: RequestHandler = async (
        req: Request,
        res: Response
    ) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const { full_name, total_students, course_id, semester_id, teacher_id } =
            req.body;
        const serviceResponse = await classSectionService.updateClassSection(
            id,
            full_name,
            total_students,
            course_id,
            semester_id,
            teacher_id
        );
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public deleteClassSection: RequestHandler = async (
        req: Request,
        res: Response
    ) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await classSectionService.deleteClassSection(id);
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };
}

export const classSectionController = new ClassSectionController();