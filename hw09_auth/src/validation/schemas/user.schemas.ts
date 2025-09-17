import Joi from "joi";

import { emailPattern } from "../patterns/auth.patterns";

export const emailSchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern.value).min(5).required(),
});
