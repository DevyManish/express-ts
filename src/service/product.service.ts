import { Document, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { productDocument, productModel } from "../models/product.model.js";
import lodash from "lodash";
import { UserDocument } from "../models/user.model.js";

export interface CreateProductInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
}

export const createProduct = async (
  input: CreateProductInput
) => {
  return productModel.create(input);
};

export const updateProduct = async (
  query: FilterQuery<productDocument>,
  update: UpdateQuery<productDocument>,
  options: QueryOptions
) => {
  return productModel.findOneAndUpdate(query, update, options);
};

export const findProduct = async (
  query: FilterQuery<productDocument>,
  options: QueryOptions = { lean: true }
) => {
  return productModel.findOne(query, {}, options);
};

export const deleteProduct = async (
  query: FilterQuery<productDocument>
): Promise<{ deletedCount: number }> => {
  return productModel.deleteOne(query);
};
