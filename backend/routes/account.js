import express from "express";
import { authMiddleware } from "../middleware.js";
import { Account } from "../db.js";
import z from "zod";

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  try {
    const userAccount = await Account.findOne({ userId: req.userId });
    if (!userAccount) {
      return res.status(500).json({
        message: "Unexpected error occurred",
      });
    }

    return res.json({
      balance: userAccount.balance,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Unexpected error occurred",
      error: e,
    });
  }
});

const transferSchema = z.object({
  to: z.string(),
  amount: z.number().min(1),
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const result = transferSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request",
    });
  }

  const reqBody = result.data;
});

export default accountRouter;
