import { UserDocument, userModel } from "../models/user.model.js";
import { CreateUserInput } from "../schema/user.schema.js";

export async function createUser(input: CreateUserInput): Promise<UserDocument> {
  try {
    return await userModel.create(input);
  } catch (e: any) {
    throw new Error(e.message || "Error creating user");
  }
}
