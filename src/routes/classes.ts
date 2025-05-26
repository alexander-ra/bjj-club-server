import * as express from 'express';
import db from '../db';
import { Class } from '../models/Class';

const router = express.Router();

router.get('/', async (req, res) => {
  await db.read();
  res.json(db.data?.classes || []);
});

router.post('/', async (req, res) => {
  const newClass: Class = req.body;
  await db.read();
  db.data!.classes.push(newClass);
  await db.write();
  res.status(201).json(newClass);
});

export default router;
