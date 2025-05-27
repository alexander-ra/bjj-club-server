import * as express from 'express';
import db from '../db';
import { ScheduleEvent } from '../models/ScheduleEvent';
import { requireAdminPassword } from './requireAdminPassword';
import { Request, Response } from 'express';

const adminRouter = express.Router();
const publicRouter = express.Router();

// POST /api/admin/schedule
adminRouter.post(
  '/',
  requireAdminPassword,
  async (req: Request, res: Response): Promise<void> => {
    console.log('POST /api/admin/schedule called'); // Added log
    const newEvent: ScheduleEvent = req.body;
    await db.read();
    db.data!.schedule.push(newEvent);
    await db.write();
    res.status(201).json(newEvent);
  }
);

// GET /api/schedule
publicRouter.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    await db.read();
    res.json(db.data!.schedule);
  }
);

// GET /api/schedule/:id
publicRouter.get(
  '/:id',
  async (req: Request, res: Response): Promise<void> => {
    await db.read();
    const found = db.data!.schedule.find((e: ScheduleEvent) => e.id === req.params.id);
    if (!found) {
      res.status(404).json({ error: 'Schedule entry not found' });
      return;
    }
    res.json(found);
  }
);

// DELETE /api/admin/schedule/:id
adminRouter.delete(
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

// PUT /api/admin/schedule/:id
adminRouter.put(
  '/:id',
  requireAdminPassword,
  async (req: Request, res: Response): Promise<void> => {
    console.log(`PUT /api/admin/schedule/${req.params.id} called`); // Added log
    const eventId = req.params.id;
    const updatedEventData: Partial<ScheduleEvent> = req.body;

    await db.read();
    const eventIndex = db.data!.schedule.findIndex((e: ScheduleEvent) => e.id === eventId);

    if (eventIndex === -1) {
      res.status(404).json({ error: 'Schedule entry not found' });
      return;
    }

    // Update the existing event with new data
    db.data!.schedule[eventIndex] = {
      ...db.data!.schedule[eventIndex],
      ...updatedEventData,
      id: eventId, // Ensure ID remains unchanged
    };

    await db.write();
    res.status(200).json(db.data!.schedule[eventIndex]);
  }
);

export { adminRouter, publicRouter };
