//catch the error parameters from the apiError and extract data
const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    if (process.env.NODE_ENV == 'development'){
        sendErrorForDev(err, res);
        console.log(err);
    }else{
        sendErrorForProd(err, res);
}
}

//return the response after assigning the extracted params above
const sendErrorForDev=(err, res) => {
    return res.status(err.statusCode).json({ 
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
     });
}
const sendErrorForProd=(err, res) => {
    return res.status(err.statusCode).json({ 
        status: err.status,
        message: err.message,
     });
}

module.exports = globalError;