import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { adminRouter as adminClassesRouter, publicRouter as publicClassesRouter } from './routes/adminClasses';
import { adminRouter as adminScheduleRouter, publicRouter as publicScheduleRouter } from './routes/adminSchedule';
import { adminRouter as adminInfoRouter, publicRouter as publicInfoRouter } from './routes/adminInfo';
import { adminRouter as adminGalleryRouter, publicRouter as publicGalleryRouter } from './routes/adminGallery';
import { initDB } from './db';

const app = express();

// Simple ping route for testing
app.get('/ping', (req, res) => {
  console.log('GET /ping called');
  res.send('pong');
});

app.use(cors());
app.use(bodyParser.json());

console.log('Registering routes'); // Updated log

// Admin routes
app.use('/api/admin/classes', adminClassesRouter);
app.use('/api/admin/schedule', adminScheduleRouter);
app.use('/api/admin/info', adminInfoRouter);
app.use('/api/admin/gallery', adminGalleryRouter);

// Public routes
app.use('/api/classes', publicClassesRouter);
app.use('/api/schedule', publicScheduleRouter);
app.use('/api/info', publicInfoRouter);
app.use('/api/gallery', publicGalleryRouter);

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
