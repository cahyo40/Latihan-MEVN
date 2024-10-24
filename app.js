import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// router
import authRouter from './router/authRouter.js';

dotenv.config();



const app = express();
const port = process.env.APP_PORT;

// middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}



// server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});


app.use('/api/v1/test', (req, res) => {
    res.status(200).json({ message: 'Hello World' })
})

// router
app.use('/api/v1/auth', authRouter)


// middleware Error
app.use(notFound);
app.use(errorHandler);


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });
