import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller.js";
import validate from "./middleware/validateResource.js";
import { createUserSchema } from "./schema/user.schema.js";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from "./controller/session.controller.js";
import { createSessionSchema } from "./schema/session.schema.js";
import { requireUser } from "./middleware/requiredUser.js";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/product.controller.js";
import { createProductSchema } from "./schema/product.schema.js";


const routes = (app: Express) => {
  app.get("/health", (req: Request, res: Response) => res.sendStatus(200));
  app.post("/api/users", validate(createUserSchema), createUserHandler);

  app.post("/api/sessions",validate(createSessionSchema),createUserSessionHandler);
  app.get("/api/sessions", requireUser, getUserSessionHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post("/api/products", validate(createProductSchema), ()=> console.log("create product hit "), createProductHandler);
  app.get("/api/products", requireUser, getProductHandler);
  app.put("/api/products", requireUser, updateProductHandler);
  app.delete("/api/products", requireUser, deleteProductHandler);

};

export default routes;
