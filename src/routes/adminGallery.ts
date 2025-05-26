import * as express from 'express';
import { Request, Response } from 'express';
import db from '../db';
import { requireAdminPassword } from './requireAdminPassword';
import { GalleryImage } from '../models/GalleryImage';

const router = express.Router();

// POST /api/admin/gallery
router.post(
  '/',
  requireAdminPassword,
  async (req: Request, res: Response): Promise<void> => {
    const newImage: GalleryImage = req.body;
    await db.read();
    db.data!.gallery.push(newImage);
    await db.write();
    res.status(201).json(newImage);
  }
);

// DELETE /api/admin/gallery/:url
router.delete(
  '/:url',
  requireAdminPassword,
  async (req: Request, res: Response): Promise<void> => {
    await db.read();
    const idx = db.data!.gallery.findIndex((img: GalleryImage) => img.url === req.params.url);
    if (idx === -1) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }
    db.data!.gallery.splice(idx, 1);
    await db.write();
    res.status(204).send();
  }
);

export default router;

