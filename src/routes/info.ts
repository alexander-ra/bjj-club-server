import * as express from 'express';
import db from '../db';
import { Info } from '../models/Info';

const router = express.Router();

router.get('/sport', async (req, res) => {
  // console.log('GET /api/info/sport called - Sending immediate test response.');
  // res.json({ message: "Test response: /api/info/sport reached" });
  // return; // Exit early for this test

  // Original code temporarily commented out:
  try {
    console.log('GET /api/info/sport called');
    await db.read();
    console.log('db.read() finished');
    res.json(db.data?.sportInfo || {});
  } catch (err) {
    console.error('Error in GET /api/info/sport:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/teacher', async (req, res) => {
  try {
    console.log('GET /api/info/teacher called');
    await db.read();
    res.json(db.data?.teacherInfo || {});
  } catch (err) {
    console.error('Error in GET /api/info/teacher:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/sport', async (req, res) => {
  try {
    const newInfo: Info = req.body;
    await db.read();
    db.data!.sportInfo = newInfo;
    await db.write();
    res.status(201).json(newInfo);
  } catch (err) {
    console.error('Error in POST /api/info/sport:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/teacher', async (req, res) => {
  try {
    const newInfo: Info = req.body;
    await db.read();
    db.data!.teacherInfo = newInfo;
    await db.write();
    res.status(201).json(newInfo);
  } catch (err) {
    console.error('Error in POST /api/info/teacher:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

