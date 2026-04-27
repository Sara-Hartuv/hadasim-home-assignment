import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./db/connectDB";
import studentRoutes from "./routes/studentRoutes";
import teacherRoutes from "./routes/teacherRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes)

app.get("/", (req, res) => {
  res.send("Server is running");
});

const startServer = async (): Promise<void> => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};



startServer();