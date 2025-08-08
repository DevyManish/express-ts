import { Request, Response, NextFunction } from "express";
import lodash from "lodash";
import { verifyJwt } from "../utils/jwt.utils.js";

export const deserializeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = lodash
    .get(req, "headers.authorization", "")
    .replace(/^Bearer\s/, "");

  if (!accessToken) {
    return next();
  }

  const { expired, decoded } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  return next();
};
