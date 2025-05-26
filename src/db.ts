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
  console.log('[DB] Initializing database...');
  try {
    console.log('[DB] Reading database file...');
    await db.read();
    console.log('[DB] Database file read successfully.');
    db.data ||= { classes: [], gallery: [], info: [], schedule: [], sportInfo: {} as Info, teacherInfo: {} as Info };
    console.log('[DB] Writing initial data to database file...');
    await db.write();
    console.log('[DB] Initial data written successfully.');
    console.log('[DB] Database initialized.');
  } catch (error) {
    console.error('[DB] Error initializing database:', error);
    throw error; // Re-throw to be caught by server startup
  }
}

export default db;
