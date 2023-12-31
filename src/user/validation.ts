import express from "express";
import { CreateUserDto } from "./dto/createUser.input";
import { validate } from "class-validator";
import { UpdateUserDto } from "./dto/updateUser.input";
import { HttpStatusCodes } from "../utils/status.code";

export const createValidation = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const createUserDto = new CreateUserDto(req?.body);
  const validationErrors = await validate(createUserDto);

  if (validationErrors.length > 0) {
    const formattedErrors = validationErrors.map((error) => error.constraints);
    return res
      .status(HttpStatusCodes.NOT_FOUND)
      .json({ errors: formattedErrors });
  }
  next();
};

export const updateValidation = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const updateUserDto = new UpdateUserDto(req?.body);
  const validationErrors = await validate(updateUserDto);

  if (validationErrors.length > 0) {
    const formattedErrors = validationErrors.map((error) => error.constraints);
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: formattedErrors });
  }
  next();
};
