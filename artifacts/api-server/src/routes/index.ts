import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import contentRouter from "./content";
import mediaRouter from "./media";
import usersRouter from "./users";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/content", contentRouter);
router.use("/media", mediaRouter);
router.use("/users", usersRouter);

export default router;
