import type { Request, RequestHandler, Response } from "express";

import { userService } from "@/api/user/user.service";

class UserController {
	public getAllUsers: RequestHandler = async (_req: Request, res: Response) => {
		const serviceResponse = await userService.getAllUsers();
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};

	public getUserById: RequestHandler = async (req: Request, res: Response) => {
		const id = Number.parseInt(req.params.id as string, 10);
		const serviceResponse = await userService.getUserById(id);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};

	public getMyself: RequestHandler = async (req: Request, res: Response) => {
		const serviceResponse = await userService.getUserById((req as any).user.id);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};
	public createUser: RequestHandler = async (req: Request, res: Response) => {
		const { full_name, email, password, role } = req.body;
		const serviceResponse = await userService.createUser(
			full_name,
			email,
			password,
			role
		);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};
	public updateUser: RequestHandler = async (req: Request, res: Response) => {
		const id = Number.parseInt(req.params.id as string, 10);
		const { full_name, phone } = req.body;
		const serviceResponse = await userService.updateUser(id, full_name, phone);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};
	public changePassword: RequestHandler = async (
		req: Request,
		res: Response
	) => {
		const { email, current_password, new_password } = req.body;
		const serviceResponse = await userService.changePassword(
			email,
			current_password,
			new_password
		);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};
	public deleteUser: RequestHandler = async (req: Request, res: Response) => {
		const id = Number.parseInt(req.params.id as string, 10);
		const serviceResponse = await userService.deleteUser(id);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};
}

export const userController = new UserController();
