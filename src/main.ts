import express from "express";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";
require("express-async-errors");
//import usersRoutes from './routes/users.routes'
import semestersRoutes from './routes/semesters.routes'
import subjectsRoutes from './routes/subjects.routes'
// import assignmentsRoutes from './routes/assignments.routes'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/auth", authRoutes);
//app.use('/api/users', usersRoutes);
app.use('/api/semesters', semestersRoutes);
app.use('/api/subjects', subjectsRoutes);
// app.use('/api/assignments', assignmentsRoutes);

app.listen(PORT, () => {
  console.log("Server on port", PORT);
});

app.use(errorHandler);