import { StatusCodes } from "http-status-codes";
import { logger } from "@/server";
import { ServiceResponse } from "@/common/models/serviceResponse";
import {
  ReportOptions,
  QueryOptions,
  MoneyRepository,
} from "./money.repository";

class MoneyService {
  private moneyRepository: MoneyRepository;

  constructor(repository: MoneyRepository = new MoneyRepository()) {
    this.moneyRepository = repository;
  }
  async reportByLevel(options: ReportOptions) {
    try {
      const result = await this.moneyRepository.reportByLevel(options);
      return ServiceResponse.success("Stats found", result);
    } catch (error) {
      const errorMessage = `Error generating report: ${
        (error as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving stats.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async changeMoneyPerCredit(money: Number): Promise<ServiceResponse<Number | null>> {
    try {
      const result = await this.moneyRepository.changeMoneyPerCredit(money);

      return ServiceResponse.success<Number>(
        "Money per credit updated successfully",
        result
      );
    } catch (error) {
      const errorMessage = `Error updating money per credit: $${
        (error as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while updating money per credit.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const moneyService = new MoneyService();
