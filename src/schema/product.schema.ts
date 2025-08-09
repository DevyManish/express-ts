import { z } from "zod";

const bodySchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z
    .string()
    .nonempty("Description is required")
    .min(120, "Description should be at least 120 characters long"),
  price: z.number().positive("Price must be greater than 0"),
  image: z.string().nonempty("Image is required"),
});

const paramsSchema = z.object({
  productId: z.string().nonempty("Product Id is required."),
});

export const createProductSchema = z.object({
  body: bodySchema,
});

export const updateProductSchema = z.object({
  body: bodySchema,
  params: paramsSchema,
});

export const deleteProductSchema = z.object({
  params: paramsSchema,
});

export const getProductSchema = z.object({
  params: paramsSchema,
});

export type CreateProductInput = z.TypeOf<typeof createProductSchema>;
export type UpdateProductInput = z.TypeOf<typeof updateProductSchema>;
export type ReadProductInput = z.TypeOf<typeof getProductSchema>;
export type DeleteProductInput = z.TypeOf<typeof deleteProductSchema>;