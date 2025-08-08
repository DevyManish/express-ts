import { sessionModel } from "../models/session.model.js";

export async function createSession(userId: string, userAgent: string) {
  const session = await sessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}
