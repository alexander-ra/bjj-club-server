import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import adminClassesRoutes from './routes/adminClasses';
import adminScheduleRoutes from './routes/adminSchedule';
import adminInfoRoutes from './routes/adminInfo';
import adminGalleryRoutes from './routes/adminGallery';
import { initDB } from './db';

const app = express();

// Simple ping route for testing
app.get('/ping', (req, res) => {
  console.log('GET /ping called');
  res.send('pong');
});

app.use(cors());
app.use(bodyParser.json());

app.use('/api/admin/classes', adminClassesRoutes);
app.use('/api/admin/schedule', adminScheduleRoutes);
app.use('/api/admin/info', adminInfoRoutes);
app.use('/api/admin/gallery', adminGalleryRoutes);

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
