import express from 'express';
import { connectDB } from './config/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/Route.js';

dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 5000;

// db connection
connectDB();

// middlewares
app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/api/warrantys', router);

// serve static files
app.use('/pr-files', express.static('pr-files'));
app.use('/po-files', express.static('po-files'));


// server listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
