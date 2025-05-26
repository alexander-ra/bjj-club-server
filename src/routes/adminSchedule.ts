import * as express from 'express';
import db from '../db';
import { ScheduleEvent } from '../models/ScheduleEvent';
import { requireAdminPassword } from './requireAdminPassword';
import { Request, Response } from 'express';

const router = express.Router();

// POST /api/admin/schedule
router.post(
  '/',
  requireAdminPassword,
  async (req: Request, res: Response): Promise<void> => {
    const newEvent: ScheduleEvent = req.body;
    await db.read();
    db.data!.schedule.push(newEvent);
    await db.write();
    res.status(201).json(newEvent);
  }
);

// DELETE /api/admin/schedule/:id
router.delete(
  '/:id',
  requireAdminPassword,
  async (req: Request, res: Response): Promise<void> => {
    await db.read();
    const idx = db.data!.schedule.findIndex((e: ScheduleEvent) => e.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Schedule entry not found' });
      return;
    }
    db.data!.schedule.splice(idx, 1);
    await db.write();
    res.status(204).send();
  }
);

export default router;
