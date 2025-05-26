export interface ScheduleEvent {
  id: string;
  classId: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  startTime: string; // HH:mm
  durationMinutes: number;
}

