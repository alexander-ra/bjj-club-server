export interface ScheduleEvent {
  id: string;
  classId: string;
  start: string; // ISO date string
  end: string;   // ISO date string
  location: string;
  description: {
    en: string;
    es: string;
    bg: string;
  };
}

