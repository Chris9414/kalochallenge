const express = require("express");
const cors = require("cors");
const hpp = require("hpp");
const morgan = require("morgan");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
require('dotenv').config();

const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
const usersRoutes = require('./routes/users.routes')
const postsRoutes = require('./routes/posts.routes')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/error.controller')
const authRoutes = require('./routes/auth.routes')


const app = express(); 

const PORT= +process.env.PORT || 8000;

const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in one hour!"
})

if( process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(cors());
app.use(express.json());
app.use(xss());
app.use(hpp());

app.use("/api/v1", limiter)

app.use(usersRoutes);
app.use(postsRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`App Running on port ${PORT}`);
});

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.all('*', (req,res,next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler)

module.exports = app;

