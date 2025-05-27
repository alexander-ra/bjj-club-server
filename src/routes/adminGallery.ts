import * as express from 'express';
import { Request, Response } from 'express';
import db from '../db';
import { requireAdminPassword } from './requireAdminPassword';
import { GalleryImage } from '../models/GalleryImage';

const adminRouter = express.Router();
const publicRouter = express.Router();

// POST /api/admin/gallery
adminRouter.post(
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

// GET /api/gallery
publicRouter.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    await db.read();
    res.json(db.data!.gallery);
  }
);

// GET /api/gallery/:url
publicRouter.get(
  '/:url',
  async (req: Request, res: Response): Promise<void> => {
    await db.read();
    const found = db.data!.gallery.find((img: GalleryImage) => img.url === req.params.url);
    if (!found) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }
    res.json(found);
  }
);

// PUT /api/admin/gallery/:url
adminRouter.put(
  '/:url',
  requireAdminPassword,
  async (req: Request, res: Response): Promise<void> => {
    console.log(`PUT /api/admin/gallery/${req.params.url} called`); // Added log
    const imageUrl = req.params.url;
    const updatedImageData: Partial<GalleryImage> = req.body;

    await db.read();
    const imageIndex = db.data!.gallery.findIndex((img: GalleryImage) => img.url === imageUrl);

    if (imageIndex === -1) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    // Update the existing image with new data, ensuring URL remains unchanged
    db.data!.gallery[imageIndex] = {
      ...db.data!.gallery[imageIndex],
      ...updatedImageData,
      url: imageUrl, // Ensure URL remains unchanged
    };

    await db.write();
    res.status(200).json(db.data!.gallery[imageIndex]);
  }
);

// DELETE /api/admin/gallery/:url
adminRouter.delete(
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

export { adminRouter, publicRouter };
