import express from "express";
import router_v1 from "./routes/index.js";
import cors from "cors";

export const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", router_v1);

app.listen(PORT, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Server starting on port: ", PORT);
});
