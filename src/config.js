import { resolve } from "node:path";
import dotenv from "dotenv";

export const NODE_ENV = process.env.NODE_ENV ?? "development";

dotenv.config({
  path: resolve(`.env.${NODE_ENV}`)
});

export const PORT = parseInt(process.env.PORT ?? "9000");

export const DB_URI = process.env.DB_URI;