// @ts-ignore
import { Low } from 'lowdb';
// @ts-ignore
import { JSONFile } from 'lowdb/node';
import { Class } from './models/Class';
import { GalleryImage } from './models/GalleryImage';
import { Info } from './models/Info';
import { ScheduleEvent } from './models/ScheduleEvent';

export interface DatabaseSchema {
  classes: Class[];
  gallery: GalleryImage[];
  info: Info[];
  schedule: ScheduleEvent[];
  sportInfo: Info;
  teacherInfo: Info;
}

const adapter = new JSONFile<DatabaseSchema>('db.json');
const db = new Low<DatabaseSchema>(adapter, {} as any);

export async function initDB() {
  await db.read();
  db.data ||= { classes: [], gallery: [], info: [], schedule: [], sportInfo: {} as Info, teacherInfo: {} as Info };
  await db.write();
}

export default db;
