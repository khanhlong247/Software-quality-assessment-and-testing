const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Config CORS
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./src/api-docs/swagger");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Define routes
const userRoutes = require("./src/api/routes/user.routes");
const authRoutes = require("./src/api/routes/auth.routes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
});
