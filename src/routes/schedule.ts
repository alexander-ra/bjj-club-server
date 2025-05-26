import * as express from 'express';
import db from '../db';
import { ScheduleEvent } from '../models/ScheduleEvent';

const router = express.Router();

router.get('/', async (req, res) => {
  await db.read();
  res.json(db.data?.schedule || []);
});

router.post('/', async (req, res) => {
  const newEvent: ScheduleEvent = req.body;
  await db.read();
  db.data!.schedule.push(newEvent);
  await db.write();
  res.status(201).json(newEvent);
});

export default router;

