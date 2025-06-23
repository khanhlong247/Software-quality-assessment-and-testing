// userRouter.test.ts

/// <reference types="vitest" />
import { describe, it, expect, beforeAll, vi } from "vitest";
import request from "supertest";
import type { User } from "@/api/user/user.model";
import type { ServiceResponse } from "@/common/models/serviceResponse";

import type { Request, Response, NextFunction } from 'express'

vi.mock("@/common/middleware/auth", () => ({
  authenticate: (req: Request, _res: Response, next: NextFunction) => {
    req.user = { id: 1, role: "admin" } as any; 
    next();
  },
  authorize: () => (_req: Request, _res: Response, next: NextFunction) => {
    next();
  }
}));


import { app } from "../../../server";

describe("User API Endpoints", () => {
  let createdUserId: number;

  const sampleUser = {
    full_name: "John Doe",
    email: "john@example.com",
    hash_password: "123456",
    role: "user",
    phone: "123456789",
  };

  it("should create a new user", async () => {
    const res = await request(app).post("/users").send(sampleUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.full_name).toBe(sampleUser.full_name);

    createdUserId = res.body.id;
  });

  it("should get all users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get user by ID", async () => {
    const res = await request(app).get(`/users/${createdUserId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", createdUserId);
  });

  it("should update user by ID", async () => {
    const res = await request(app).put(`/users/${createdUserId}`).send({
      ...sampleUser,
      full_name: "John Updated",
    });

    expect(res.status).toBe(200);
    expect(res.body.full_name).toBe("John Updated");
  });

  it("should delete user by ID", async () => {
    const res = await request(app).delete(`/users/${createdUserId}`);
    expect(res.status).toBe(204);

    const check = await request(app).get(`/users/${createdUserId}`);
    expect(check.status).toBe(404);
  });
});
