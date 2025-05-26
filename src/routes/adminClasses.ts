import * as express from 'express';
import db from '../db';
import { Class } from '../models/Class';
import { requireAdminPassword } from './requireAdminPassword';
import { Request, Response } from 'express';

const router = express.Router();

// POST /api/admin/classes
router.post(
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

// PUT /api/admin/classes/:id
router.put(
  '/:id',
  requireAdminPassword,
  async (req: Request, res: Response): Promise<void> => {
    await db.read();
    const idx = db.data!.classes.findIndex((c: Class) => c.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }
    db.data!.classes[idx] = req.body;
    await db.write();
    res.json(db.data!.classes[idx]);
  }
);

// DELETE /api/admin/classes/:id
router.delete(
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

export default router;
