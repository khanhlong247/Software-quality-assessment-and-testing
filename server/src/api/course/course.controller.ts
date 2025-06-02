import type { Request, RequestHandler, Response } from "express";
import { courseService } from "./course.service";

class CourseController {
    public getAllCourses: RequestHandler = async (
        _req: Request,
        res: Response
    ) => {
        const serviceResponse = await courseService.getAllCourses();
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public getCourseById: RequestHandler = async (
        req: Request,
        res: Response
    ) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await courseService.getCourseById(id);
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public createCourse: RequestHandler = async (req: Request, res: Response) => {
        const { name, credit, coefficient, total_hour } = req.body;
        const serviceResponse = await courseService.createCourse(
            name,
            credit,
            coefficient,
            total_hour
        );
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public updateCourse: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const { name, credit, coefficient, total_hour } = req.body;
        const serviceResponse = await courseService.updateCourse(
            id,
            name,
            credit,
            coefficient,
            total_hour
        );
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public deleteCourse: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await courseService.deleteCourse(id);
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };
}

export const courseController = new CourseController();