import { Request, Response } from "express";
import { validatePassword } from "../service/user.service.js";
import {
  createSession,
  findSession,
  updateSession,
} from "../service/session.service.js";
import { signJwt } from "../utils/jwt.utils.js";
import config from "config";
import logger from "../utils/logger.js";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  // validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password.");
  }

  // create a session
  const session = await createSession(
    user._id.toString(),
    req.get("user-agent") || ""
  );

  // create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } //15 min
  );

  // create a refresh token

  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenTtl") } //1yr
  );

  // return access & refresh tokens
  logger.info(`POST /api/users - ${user.name}'s account created.`);
  return res.send({ accessToken, refreshToken });
};

export const getUserSessionHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  const sessions = await findSession({ user: userId, valid: true });

  return res.status(200).send(sessions);
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.status(200).send({
    accessToken: null,
    refreshToken: null,
  });
};
