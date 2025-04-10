import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import articleRoutes from "./routes/article.route.js";
import researchRoutes from "./routes/research.route.js";
import commentRoutes from "./routes/comment.route.js";
import articleCommentRoutes from "./routes/articleComment.route.js";
import updateRoutes from "./routes/update.route.js";
import adRoutes from "./routes/ad.route.js";

import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cookieParser());

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server is listening at http://${host}:${port}`);
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/articleComment", articleCommentRoutes);
app.use("/api/update", updateRoutes);
app.use("/api/ad", adRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
