import type { Request, RequestHandler, Response } from "express";

import { teacherService } from "./teacher.service";
class TeacherController {
    public getAllTeachers: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await teacherService.getAllTeachers();
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public getTeacherById: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await teacherService.getTeacherById(id);
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public createTeacher: RequestHandler = async (req: Request, res: Response) => {
        const { user_id, degree_id, faculty_id } = req.body;
        const serviceResponse = await teacherService.createTeacher(
            user_id,
            degree_id,
            faculty_id
        );
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public updateTeacher: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const { degree_id, faculty_id } = req.body;
        const serviceResponse = await teacherService.updateTeacher(
            id,
            degree_id,
            faculty_id
        );
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public deleteTeacher: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await teacherService.deleteTeacher(id);
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };
}

export const teacherController = new TeacherController();
