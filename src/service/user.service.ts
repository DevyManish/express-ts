import lodash from "lodash";
import { UserDocument, userModel } from "../models/user.model.js";
import { CreateUserInput } from "../schema/user.schema.js";
import { FilterQuery } from "mongoose";

export async function createUser(
  input: CreateUserInput
): Promise<UserDocument> {
  try {
    return await userModel.create(input);
  } catch (e: any) {
    throw new Error(e.message || "Error creating user");
  }
}

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await userModel.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return lodash.omit(user.toJSON(), "password");
};


export const findUser = async (query: FilterQuery<UserDocument>) => {
  return userModel.findOne(query).lean();
}