import express from "express";
import cors from "cors";
import connectDB from "./util/dbconnection.js"; // MongoDB connection
import router from "./routes/enquiry.route.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/enquiry", router);

app.get("/", (req, res) => {
  res.send("🙋‍♂️, 🌏 🎊✨🤩");
});

connectDB(); // Connect to MongoDB

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT} ✨✨`);
});
