import fs from 'fs';
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
  let needsInit = false;
  try {
    console.log('[DB] Reading database file...');
    await db.read();
    if (!db.data || Object.keys(db.data).length === 0 ||
      (!db.data.classes?.length && !db.data.schedule?.length && !db.data.gallery?.length && !db.data.sportInfo?.text && !db.data.teacherInfo?.text)) {
      needsInit = true;
    }
  } catch (error) {
    console.warn('[DB] db.json missing, empty, or invalid. Will initialize with initial data.');
    needsInit = true;
  }
  if (needsInit) {
    try {
      const initialData = JSON.parse(fs.readFileSync(require.resolve('./bjj-initial-db.json'), 'utf-8'));
      db.data = initialData;
      await db.write();
      console.log('[DB] Initial data loaded into db.json.');
    } catch (initError) {
      console.error('[DB] Failed to load initial data:', initError);
      throw initError;
    }
  } else {
    // Ensure all properties exist, even if db.json is missing or incomplete
    db.data ||= {} as DatabaseSchema;
    db.data.classes ||= [];
    db.data.gallery ||= [];
    db.data.info ||= [];
    db.data.schedule ||= [];
    db.data.sportInfo ||= {} as Info;
    db.data.teacherInfo ||= {} as Info;
    await db.write();
    console.log('[DB] Existing data found, ensured all properties exist.');
  }
  console.log('[DB] Database initialized.');
}

export default db;
