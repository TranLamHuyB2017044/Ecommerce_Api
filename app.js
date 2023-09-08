const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./app/routes/user.route");
const authRouter = require("./app/routes/auth.route");
const productRouter = require("./app/routes/product.route");
const cartRouter = require("./app/routes/cart.route");
const orderRouter = require("./app/routes/order.route");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database !");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to review application !" });
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(5000, () => {
  console.log(`Server running at http://localhost:${5000}`);
});
