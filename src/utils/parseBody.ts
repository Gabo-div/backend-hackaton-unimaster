import { ZodError, ZodSchema } from "zod";
import { ErrorCode, HTTPError } from "./HTTPError";
import { fromZodError } from "zod-validation-error";

const parseBody = async <T>(schema: ZodSchema<T>, body: any) => {
  const result = schema.safeParse(body);

  if (!result.success) {
    throw new HTTPError(400, ErrorCode.BAD_REQUEST, parseError(result.error));
  }

  return result.data;
};

const parseError = (error: ZodError) => {
  const err = fromZodError(error, {
    maxIssuesInMessage: 1,
    prefix: "",
    prefixSeparator: "",
  });

  return err.message;
};

export default parseBody;
