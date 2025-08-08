import { FilterQuery, UpdateQuery } from "mongoose";
import { sessionModel, sessionDocument } from "../models/session.model.js";
import { Session } from "inspector/promises";

export async function createSession(userId: string, userAgent: string) {
  const session = await sessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export const findSession = async (query: FilterQuery<sessionDocument>) => {
  return sessionModel.find(query).lean(); // lean : just return plain old object same as toJSON rem funs
};

export const updateSession = async (
  query: FilterQuery<sessionDocument>,
  update: UpdateQuery<sessionDocument>
) => {
  return sessionModel.updateOne(query, update);
};
