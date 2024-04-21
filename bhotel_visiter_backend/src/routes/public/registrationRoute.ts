import { publicProcedure, router } from "../../trpc";
import { User } from "../../types";
import z from "zod";

const registrationModel = {
  login: z.string().length(6),
  email: z.string().email(),
  name: z.string(),
  surname: z.string(),
  fatherName: z.string(),
  password: z.string(),
  rePassword: z.string(),
};

export const registrationRouter = router({
  regist: publicProcedure.input(z.object(registrationModel)).query(() => {}),
});
