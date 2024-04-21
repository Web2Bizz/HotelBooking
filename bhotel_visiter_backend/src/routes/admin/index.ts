import { consoleRouter } from "./consoleRoute";
import { themeRoute } from "./themeRoute";
import { userRouter } from "./userRouter";

export const adminRouter = { themeRoute, userRouter, consoleRouter };
