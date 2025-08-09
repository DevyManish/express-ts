import { Request, Response, NextFunction } from "express";
import lodash from "lodash";
import { verifyJwt } from "../utils/jwt.utils.js";
import { reIssueAccessToken } from "../service/session.service.js";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = lodash
    .get(req, "headers.authorization", "")
    .replace(/^Bearer\s/, "");

  const refreshToken = lodash
    .get(req, "headers.x-refresh-token", "")
    .toString();

  if (!accessToken) {
    return next();
  }

  const { expired, decoded } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string);

    res.locals.user = result.decoded;

    return next();
  }
  return next();
};
