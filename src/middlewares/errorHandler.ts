import { ErrorRequestHandler } from "express";
import { HTTPError } from "../utils/HTTPError";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let status = 500;
  let message = "Internal Server Error";
  let code: string | undefined = undefined;

  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    console.log(err);
  }

  if (err instanceof HTTPError) {
    status = err.getStatus();
    message = err.getMessage();
    code = err.getCode();
  }

  res.status(status).json({
    data: null,
    error: {
      status,
      code,
      message,
    },
  });
};
