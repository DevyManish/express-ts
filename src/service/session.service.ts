import { FilterQuery, UpdateQuery } from "mongoose";
import { sessionModel, sessionDocument } from "../models/session.model.js";
import { Session } from "inspector/promises";
import { signJwt, verifyJwt } from "../utils/jwt.utils.js";
import lodash from "lodash";
import { findUser } from "./user.service.js";
import config from "config";

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

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !lodash.get(decoded, "session")) return false;

  const session = await sessionModel.findById(lodash.get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } //15 min
  );
  return accessToken;
};
