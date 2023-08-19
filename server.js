const express = require("express");
const dotenv = require("dotenv"); // import the library dotenv
const morgan = require("morgan");
dotenv.config({ path: ".env" });
const dbConnection = require("./config/database");
const ApiError= require('./utils/apiError')
const categoryRoute = require("./routes/categoryRoute");
const globalError = require("./middlewares/errorMiddleware");

//database connection
dbConnection();

//express server
const app = express();

//Middleware
app.use(express.json());
app.use("/api/v1/categories", categoryRoute);

//create custom error and send it to error handling middleware when the route is not found
app.all("*", (req, res, next) => {
    next(new ApiError(`can't find this route ${req.originalUrl}`, 400));
});
//(this is GLOBAL ERROR HANDLING MIDDELWARE)
//this is how we define error handling middlware in express
//(when passing four arguments the express will give me the error in the first attribute then i can control the errors and manipulate them)
//next will go to the next middleware
app.use(globalError);

if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

//handle rejections outside express
//any function that have no ".catch" will trigger an event called "unhandledRejection"
// we listen to this event to handle this on premise errors global
process.on('unhandledRejection', (err) => {
        console.error(`unhandledRejection Error: ${err.name} | ${error.messaage}`);
        server.close(()=>{        //to stop accepting incoming requests
            console.log('shutting down .....');
            process.exit(1);      //exit node js & stop the server
        });
    });