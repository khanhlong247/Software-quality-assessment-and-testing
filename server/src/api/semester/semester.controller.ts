import type { Request, RequestHandler, Response } from "express";
import { semesterService } from "./semester.service";
class SemesterController {
    public getAllSemesters: RequestHandler = async (
        _req: Request,
        res: Response
    ) => {
        const serviceResponse = await semesterService.getAllSemesters();
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public getSemesterById: RequestHandler = async (
        req: Request,
        res: Response
    ) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await semesterService.getSemesterById(id);
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public createSemester: RequestHandler = async (
        req: Request,
        res: Response
    ) => {
        const { name, start_year, start_date, end_date } = req.body;
        const serviceResponse = await semesterService.createSemester(
            name,
            start_year,
            start_date,
            end_date
        );
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public updateSemester: RequestHandler = async (
        req: Request,
        res: Response
    ) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const { name, start_year, start_date, end_date } = req.body;
        const serviceResponse = await semesterService.updateSemester(
            id,
            name,
            start_year,
            start_date,
            end_date
        );
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public deleteSemester: RequestHandler = async (
        req: Request,
        res: Response
    ) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await semesterService.deleteSemester(id);
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };
}
export const semesterController = new SemesterController();
