
import { StatusCodes } from "http-status-codes";
import { hashPassword, checkPassword } from "../../common/utils/password";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import jwt from "jsonwebtoken";
import { UserRepository } from "../user/user.repository";

const JWT_SECRET = process.env.JWT_SECRET || "this_is_a_secret";

export class AuthService {
    private userRepository: UserRepository;

    constructor(repository: UserRepository = new UserRepository()) {
        this.userRepository = repository;
    }

    async login(
        email: string,
        password: string
    ): Promise<ServiceResponse<string | null>> {
        const user = await this.userRepository.getUserBy("email", email);

        if (!user) {
            logger.error("User with email does not exist!");
            return ServiceResponse.failure(
                "User not found!",
                null,
                StatusCodes.NOT_FOUND
            );
        }

        const isValidPassword: boolean = await checkPassword(
            password,
            user.hash_password
        );

        if (!isValidPassword) {
            logger.error("Invalid credentials!");
            return ServiceResponse.failure(
                "Wrong password!",
                null,
                StatusCodes.CONFLICT
            );
        }
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                hash_password: user.hash_password,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        logger.info("Logged in successfully!");
        return ServiceResponse.success(
            "Logged in!",
            token,
            StatusCodes.OK
        );
    }
}

export const authService = new AuthService();