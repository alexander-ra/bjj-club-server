import * as express from 'express';
import db from '../db';
import { requireAdminPassword } from './requireAdminPassword';

const adminRouter = express.Router();
const publicRouter = express.Router();

// PUT /api/admin/info/sport
adminRouter.put('/sport', requireAdminPassword, async (req, res) => {
  console.log('PUT /api/admin/info/sport called'); // Added log
  const updatedInfo: Partial<typeof db.data.sportInfo> = req.body;
  await db.read();
  // Update existing sportInfo with new data
  db.data!.sportInfo = {
    ...db.data!.sportInfo,
    ...updatedInfo,
  };
  await db.write();
  res.status(200).json(db.data!.sportInfo);
});

// GET /api/info/sport
publicRouter.get('/sport', async (req, res) => {
  await db.read();
  res.json(db.data!.sportInfo);
});

// GET /api/admin/info/test
adminRouter.get('/test', requireAdminPassword, async (req, res) => {
  console.log('GET /api/info/test'); // Added log
  res.status(200).json({ ok: true });
});

// PUT /api/admin/info/teacher
adminRouter.put('/teacher', requireAdminPassword, async (req, res) => {
  console.log('PUT /api/admin/info/teacher called'); // Added log
  const updatedInfo: Partial<typeof db.data.teacherInfo> = req.body;
  await db.read();
  // Update existing teacherInfo with new data
  db.data!.teacherInfo = {
    ...db.data!.teacherInfo,
    ...updatedInfo,
  };
  await db.write();
  res.status(200).json(db.data!.teacherInfo);
});

// GET /api/info/teacher
publicRouter.get('/teacher', async (req, res) => {
  await db.read();
  res.json(db.data!.teacherInfo);
});

export { adminRouter, publicRouter };
