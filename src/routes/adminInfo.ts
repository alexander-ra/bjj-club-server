import * as express from 'express';
import db from '../db';
import { requireAdminPassword } from './requireAdminPassword';

const router = express.Router();

// PUT /api/admin/info/sport
router.put('/sport', requireAdminPassword, async (req, res) => {
  const newInfo = req.body;
  await db.read();
  db.data!.sportInfo = newInfo;
  await db.write();
  res.status(200).json(newInfo);
});

// GET /api/admin/info/sport
router.get('/sport', async (req, res) => {
  await db.read();
  res.json(db.data!.sportInfo);
});

// PUT /api/admin/info/teacher
router.put('/teacher', requireAdminPassword, async (req, res) => {
  const newInfo = req.body;
  await db.read();
  db.data!.teacherInfo = newInfo;
  await db.write();
  res.status(200).json(newInfo);
});

// GET /api/admin/info/teacher
router.get('/teacher', async (req, res) => {
  await db.read();
  res.json(db.data!.teacherInfo);
});

export default router;
