import type { Request, RequestHandler, Response } from "express";
import { moneyService } from "./money.service";
import { ReportLevel } from "./money.repository";

class MoneyController {
  public reportStats: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { level, year, orderBy, orderDir, limit, offset } = req.query;

      if (
        !level ||
        !["teacher", "faculty", "school"].includes(level as string)
      ) {
        res.status(400).send({
          success: false,
          message:
            "Invalid 'level' parameter. Must be 'teacher', 'faculty' or 'school'.",
        });
      }

      const options = {
        level: level as ReportLevel,
        year: year ? Number(year) : undefined,
        orderBy: typeof orderBy === "string" ? orderBy : undefined,
        orderDir:
          orderDir === "desc" || orderDir === "asc"
            ? (orderDir as "asc" | "desc")
            : undefined,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
      };

      const serviceResponse = await moneyService.reportByLevel(options);
      res.status(serviceResponse.statusCode).send(serviceResponse);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
        error: (error as Error).message,
      });
    }
  };
  public changeMoneyPerCredit: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const { money } = req.body;
    const serviceResponse = await moneyService.changeMoneyPerCredit(money);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };
}

export const moneyController = new MoneyController();
