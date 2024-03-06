import express from "express";
import { authMiddleware } from "../middleware.js";
import { Account, MONGOURI } from "../db.js";
import z from "zod";
import mongoose from "mongoose";

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

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  });

  if (account.balance < amount) {
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  });

  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  );

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  );

  res.json({
    message: "Transfer successful",
  });
});

// const transferSchema = z.object({
//   to: z.string(),
//   amount: z.number().min(1),
// });

// accountRouter.post("/transfer", authMiddleware, async (req, res) => {
//   const result = transferSchema.safeParse(req.body);
//   if (!result.success) {
//     return res.status(400).json({
//       message: "Invalid request",
//     });
//   }

//   const reqBody = result.data;

//   try {
//     const fromUser = await Account.findOne({ userId: req.userId });
//     const toUser = await Account.findOne({ userId: reqBody.to });

//     if (!fromUser || !toUser) {
//       return res.status(400).json({ message: "Invalid Account" });
//     }

//     if (fromUser.balance < reqBody.amount) {
//       return res.status(400).json({ message: "Insufficient balance" });
//     }

//     console.log(toUser.balance);

//     const session = await mongoose.startSession();
//     session.startTransaction();
//     await fromUser
//       .updateOne({ balance: fromUser.balance - reqBody.amount })
//       .session(session);
//     await toUser
//       .updateOne({ balance: toUser.balance + reqBody.amount })
//       .session(session);
//     await session.commitTransaction();
//     await session.endSession();

//     const newtoUser = await Account.findOne({ userId: reqBody.to });
//     console.log(newtoUser.balance);

//     return res.json({ message: "Transaction successful" });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       message: "Unexpected error occurred",
//       error: e,
//     });
//   }
// });

export default accountRouter;
