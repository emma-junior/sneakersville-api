import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

import productsRouter from "./routes/products.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import cartRouter from "./routes/cart.js";
import ordersRouter from "./routes/order.js";
import stripeRouter from "./routes/stripe.js";

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// const corsOptions = {
//   origin: ["http://localhost:3000", "http://sneakersvilleapp.vercel.app"],
//   credentials: true,
//   optionSuccessStatus: 200,
// };

app.use(cors());

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/checkout", stripeRouter);

app.get("/", (req, res) => {
  res.send("Welcome to emmanuel's sneakersVille app api");
});

const PORT = process.env.PORT || 5000;
const KEY = process.env.CONNECTION_URL;
mongoose
  .connect(KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
