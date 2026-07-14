const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/auth.routes");
const companyRoutes = require("./routes/company.routes");
const jobRoutes = require("./routes/job.routes");
const candidateRoutes = require("./routes/candidate.routes");
const applicationRoutes = require("./routes/application.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://jobify-nwop.vercel.app"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Jobify Backend API is running 🚀",
  });
});
app.use("/auth", authRoutes);
app.use("/company", companyRoutes);
app.use("/job", jobRoutes);
app.use("/candidate", candidateRoutes);
app.use("/application", applicationRoutes);

module.exports = app;
