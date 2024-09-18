import express from "express";
import cors from "cors";
import router from "./routes/enquiry.route.js";

const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());
app.use("/enquiry", router);

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
