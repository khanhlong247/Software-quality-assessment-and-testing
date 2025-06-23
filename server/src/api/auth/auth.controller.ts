import type { Request, RequestHandler, Response } from "express";
import { authService } from "./auth.service";

class AuthController {
  public login: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const serviceResponse = await authService.login(email, password);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };
}

export const authController = new AuthController();