import * as express from 'express';
import db from '../db';
import { Info } from '../models/Info';

const router = express.Router();

router.get('/sport', async (req, res) => {
  await db.read();
  res.json(db.data?.sportInfo || {});
});

router.get('/teacher', async (req, res) => {
  await db.read();
  res.json(db.data?.teacherInfo || {});
});

router.post('/sport', async (req, res) => {
  const newInfo: Info = req.body;
  await db.read();
  db.data!.sportInfo = newInfo;
  await db.write();
  res.status(201).json(newInfo);
});

router.post('/teacher', async (req, res) => {
  const newInfo: Info = req.body;
  await db.read();
  db.data!.teacherInfo = newInfo;
  await db.write();
  res.status(201).json(newInfo);
});

export default router;

