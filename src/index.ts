import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import classesRoutes from './routes/classes';
import scheduleRoutes from './routes/schedule';
import infoRoutes from './routes/info';
import galleryRoutes from './routes/gallery';
import { initDB } from './db';

const app = express();

// Simple ping route for testing
app.get('/ping', (req, res) => {
  console.log('GET /ping called');
  res.send('pong');
});

app.use(cors());
app.use(bodyParser.json());

app.use('/api/classes', classesRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/info', infoRoutes);
app.use('/api/gallery', galleryRoutes);

(async () => {
  try {
    await initDB();
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log('App.listen called, server should be running.');
  } catch (err) {
    console.error('Error during server startup:', err);
  }
})();
