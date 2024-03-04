import express from "express";
import userRouter from "./user.js";
import accountRouter from "./account.js";

const router_v1 = express.Router();

router_v1.use("/user", userRouter);
router_v1.use("/account", accountRouter);

export default router_v1;
