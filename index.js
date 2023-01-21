require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const {failed} = require('./src/helper/response');

const vehicleRouter = require('./src/routes/kendaraan');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/vehicle', vehicleRouter);

app.all('*', (req, res, next) => {
    next (failed (res, {
        code: 503,
        status: 'error',
        message: `Service unavailable`,
        error: [],
    }))
})

app.use((err, req, res, next) => {
    const messageError = err.message || "internal server error"
    const statusCode = err.status || 500
    res.status(statusCode).json({
        message : messageError
    })
    next()
})

const host = process.env.DB_HOST;
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on http://${host}:${port}`)
});