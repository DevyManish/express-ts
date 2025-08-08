import { Request, Response } from "express";
import { validatePassword } from "../service/user.service.js";
import { createSession } from "../service/session.service.js";
import { signJwt } from "../utils/jwt.utils.js";
import config from "config";

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
    { expiresIn: config.get("refreshTokenTtl") } //15 min
  );

  // return access & refresh tokens

  return res.send({ accessToken, refreshToken });
};
