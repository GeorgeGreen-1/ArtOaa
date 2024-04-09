import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import { errorHandler, notFound } from "./middleware/error.js";
import UserRouter from "./routes/userRoutes.js";
import OrderRouter from "./routes/orderRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS to allow requests from your front-end developer's localhost
app.use(
  cors({
    origin: "https://art-oa-front.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // Allow cookies to be sent from front-end to backend
  })
);

app.use((req, res, next) => {
  console.log("Parsed Cookies:", req.cookies);
  next();
});
connectDb();

app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    // const indexPath = path.resolve(__dirname, "client", "dist", "index.html");
    const indexPath = path.resolve(__dirname, "../client/dist/index.html");
    console.log("Resolved index.html path:", indexPath);
    res.sendFile(indexPath);
  });
} else {
  app.get("/", (req, res) => {
    res.send("hello from server");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("listening to port: 3000");
});

export default app;
