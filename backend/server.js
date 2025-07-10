import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import todoRoutes from "./routes/todo.route.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to DB. Server not started.");
  });
