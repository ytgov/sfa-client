import * as dotenv from "dotenv";

export const NODE_ENV = process.env.NODE_ENV || "development";

let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `.env.test`;
    break;
  case "production":
    path = `.env.production`;
    break;
  default:
    path = `.env.development`;
}
dotenv.config({ path: path });

console.log (`LOADING ${NODE_ENV} CONFIG FROM ${path}`)

export const API_PORT = parseInt(process.env.API_PORT || "3000");
//export const FRONTEND_URL = process.env.FRONTEND_URL || "";
//export const AUTH_REDIRECT = process.env.AUTH_REDIRECT || process.env.FRONTEND_URL || "";
