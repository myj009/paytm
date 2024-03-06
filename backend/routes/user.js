import express from "express";
import { z } from "zod";
import { Account, User } from "../db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { authMiddleware } from "../middleware.js";

const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be larger than 3 characters")
    .max(30, "Username should be smaller than 30 characters")
    .trim()
    .email("Email required"),
  firstName: z.string().max(30).trim(),
  lastName: z.string().trim().max(30),
  password: z.string().max(30).min(6),
});

const userRouter = express.Router();
userRouter.post("/signup", async (req, res) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ message: "Invalid inputs", error: result.error.format() });
  }

  try {
    const userExists = await User.findOne({ username: result.data.username });
    if (userExists) {
      return res.status(400).json({ message: "Email already taken" });
    }

    const newUser = await User.create({
      username: result.data.username,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      password: result.data.password,
    });
    const userId = newUser._id.toString();

    const randomBalance = Math.random() * 10000;

    await Account.create({
      userId: newUser._id,
      balance: randomBalance.toFixed(2),
    });

    const token = jwt.sign({ userId }, JWT_SECRET);
    return res.json({
      message: "User created successfully",
      token: token,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Error while communicating with db", error: e });
  }
});

const userMinSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be larger than 3 characters")
    .max(30, "Username should be smaller than 30 characters")
    .trim()
    .email("Email required"),
  password: z.string().max(30).min(6),
});

userRouter.post("/signin", async (req, res) => {
  const result = userMinSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ message: "Inavlid params", error: result.error.format() });
  }

  const foundUser = await User.findOne({
    username: result.data.username,
    password: result.data.password,
  });
  if (!foundUser) {
    return res.status(411).json({ message: "Incorrect username or password" });
  }

  const token = jwt.sign({ userId: foundUser._id.toString() }, JWT_SECRET);
  return res.json({ token: token });
});

const updateUserSchema = z.object({
  firstName: z.string().max(30).trim().optional(),
  lastName: z.string().trim().max(30).optional(),
  password: z.string().max(30).min(6).optional(),
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const result = updateUserSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(411)
      .json({ message: "Error while updating information" });
  }

  await User.updateOne({ _id: req.userId }, result.data);
  res.json({
    message: "Updated successfully",
  });
});

userRouter.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter;

  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: filter } },
        { lastName: { $regex: filter } },
      ],
    });

    return res.json(
      users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      }))
    );
  } catch (e) {
    return res.status(500).json({
      message: "Error in db",
      error: e,
    });
  }
});

export default userRouter;
