import type { Request, RequestHandler, Response } from "express";

import { degreeService } from "./degree.service";

class DegreeController {
    public getAllDegrees: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await degreeService.getAllDegrees();
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public getDegreeById: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await degreeService.getDegreeById(id);
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };
    public createDegree: RequestHandler = async (req: Request, res: Response) => {
        const { full_name, short_name, salary_grade } = req.body;
        const serviceResponse = await degreeService.createDegree(
            full_name,
            short_name,
            salary_grade
        );
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };
    public updateDegree: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const { full_name, short_name, salary_grade } = req.body;
        const serviceResponse = await degreeService.updateDegree(
            id,
            full_name,
            short_name,
            salary_grade
        );
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public deleteDegree: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await degreeService.deleteDegree(id);
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };
}

export const degreeController = new DegreeController();
