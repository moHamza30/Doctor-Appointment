const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const globalErrorHandler = require("./utils/globalErrorHandler");
const UserRoute = require("./routes/UserRoute");
const DoctorRoutes = require("./routes/DoctorRoutes");
const notificationsRoute = require("./routes/NotificationsRoute")
dotenv.config();
require("./db");
const cors = require("cors");
const port = process.env.PORT || 8000;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

//  routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/users", UserRoute);
app.use("/doctors", DoctorRoutes);
app.use("/notifications", notificationsRoute);
app.use(globalErrorHandler);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
