import express from 'express';
import db from '../db';
import { GalleryImage } from '../models/GalleryImage';

const router = express.Router();

router.get('/', async (req, res) => {
  await db.read();
  res.json(db.data?.gallery || []);
});

router.post('/', async (req, res) => {
  const newImage: GalleryImage = req.body;
  await db.read();
  db.data!.gallery.push(newImage);
  await db.write();
  res.status(201).json(newImage);
});

export default router;

