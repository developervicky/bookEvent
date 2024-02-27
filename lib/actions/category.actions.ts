"use server";

import { CreateCategoryParams } from "@/types";
import { connectToDb } from "../database";
import Category from "../database/models/category.model";
import { handleError } from "../utils";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDb();

    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategory = async () => {
  try {
    await connectToDb();
    const allCategory = await Category.find();
    return JSON.parse(JSON.stringify(allCategory));
  } catch (error) {
    handleError(error);
  }
};
