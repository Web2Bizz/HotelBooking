import { publicProcedure, router } from "../../trpc";
import z from "zod";
import { Room } from "../../types/room";

const roomModel = {
  id: z.string().uuid(),
};

export const roomRouter = router({
  getAll: publicProcedure.query(() => {}),
  getById: publicProcedure
    .input(z.object(roomModel))
    .query((): Array<Room> => []),
});
