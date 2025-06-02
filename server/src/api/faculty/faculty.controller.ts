import type { Request, RequestHandler, Response } from "express";

import { facultyService } from "./faculty.service";

class FacultyController {
    public getAllFaculties: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await facultyService.getAllFaculties();
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public getFacultyById: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await facultyService.getFacultyById(id);
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };
    public createFaculty: RequestHandler = async (req: Request, res: Response) => {
        const { full_name, short_name, description } = req.body;
        const serviceResponse = await facultyService.createFaculty(
            full_name,
            short_name,
            description
        );
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };
    public updateFaculty: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const { full_name, short_name, description } = req.body;
        const serviceResponse = await facultyService.updateFaculty(
            id,
            full_name,
            short_name,
            description
        );
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public deleteFaculty: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await facultyService.deleteFaculty(id);
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };
}

export const facultyController = new FacultyController();
