import * as express from 'express';
import db from '../db';
import { Class } from '../models/Class';
import { requireAdminPassword } from './requireAdminPassword';
import { Request, Response } from 'express';

const adminRouter = express.Router();
const publicRouter = express.Router();

// POST /api/admin/classes
adminRouter.post(
  '/',
  requireAdminPassword,
  async (req: Request, res: Response): Promise<void> => {
    const newClass: Class = req.body;
    await db.read();
    db.data!.classes.push(newClass);
    await db.write();
    res.status(201).json(newClass);
    // Do not return the result of res.status().json()
  }
);

// GET /api/classes
publicRouter.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    await db.read();
    res.json(db.data!.classes);
  }
);

// GET /api/classes/:id
publicRouter.get(
  '/:id',
  async (req: Request, res: Response): Promise<void> => {
    await db.read();
    const found = db.data!.classes.find((c: Class) => c.id === req.params.id);
    if (!found) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }
    res.json(found);
  }
);

// PUT /api/admin/classes/:id
adminRouter.put(
  '/:id',
  requireAdminPassword,
  async (req: Request, res: Response): Promise<void> => {
    console.log(`PUT /api/admin/classes/${req.params.id} called`); // Added log
    const classId = req.params.id;
    const updatedClassData: Partial<Class> = req.body;

    await db.read();
    const classIndex = db.data!.classes.findIndex((c: Class) => c.id === classId);

    if (classIndex === -1) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }

    // Update the existing class with new data, ensuring ID remains unchanged
    db.data!.classes[classIndex] = {
      ...db.data!.classes[classIndex],
      ...updatedClassData,
      id: classId, // Ensure ID remains unchanged
    };

    await db.write();
    res.json(db.data!.classes[classIndex]);
  }
);

// DELETE /api/admin/classes/:id
adminRouter.delete(
  '/:id',
  requireAdminPassword,
  async (req: Request, res: Response): Promise<void> => {
    await db.read();
    const idx = db.data!.classes.findIndex((c: Class) => c.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }
    db.data!.classes.splice(idx, 1);
    await db.write();
    res.status(204).send();
  }
);

export { adminRouter, publicRouter };
