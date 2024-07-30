import express,{ Response } from 'express';
import mongoose,{ConnectOptions} from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import launchRoutes from './routes/launchRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const mongodb_uri=process.env.MONGODB_URI|| "";

app.use(cors());
app.use(bodyParser.json());

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  
  mongoose.connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }as ConnectOptions)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
      console.error('MongoDB connection error:', err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use('/api/launches', launchRoutes);
// Global error handler
app.use((err:object,res:Response) => {
  console.error('An error occurred:', err);
  res.status(500).json({ error: 'An internal server error occurred' });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
