import { Request, Response } from "express";
import logger from "../utils/logger.js";
import { createUser } from "../service/user.service.js";
import { CreateUserInput } from "../schema/user.schema.js";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  try {
    const user = await createUser(req.body); // needs to omit createdAt & updateAt, passCnfrm, cmpPassword
    logger.info(`POST /api/users - ${user.name}'s account created.`);
    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).json({
      error: e.message || "Error creating user",
    });
  }
};
