export interface Child {
  id: string;
  name: string;
  birthDate: string;
  age: string;
  gender?: 'male' | 'female';
}

export interface Activity {
  id: string;
  type: 'feeding' | 'breastfeeding' | 'diaper' | 'sleep' | 'wakeup' | 'bedtime' | 'medicine';
  date: string;
  details: {
    selectedTime?: string;
    startTime?: string;
    endTime?: string;
    amount?: number;
    breast?: 'left' | 'right';
    diaperType?: string[];
    notes?: string;
    medicine?: string;
    dosage?: string;
  };
}

export interface DailyStats {
  totalFeedings: number;
  totalSleep: number;
  totalDiaperChanges: number;
}

export interface CreateActivityRequest {
  type: Activity['type'];
  date: string;
  details: Activity['details'];
}

export interface CreateChildRequest {
  name: string;
  birthDate: string;
  age: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  allDay?: boolean;
  type: EventType;
  location?: string;
  reminderMinutes?: number;
  createdBy: string; // user ID
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export enum EventType {
  APPOINTMENT = 'appointment',
  BVC = 'bvc',
  MEETING = 'meeting',
  VACCINATION = 'vaccination',
  CHECKUP = 'checkup',
  PERSONAL = 'personal',
  OTHER = 'other'
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  allDay?: boolean;
  type: EventType;
  location?: string;
  reminderMinutes?: number;
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  id: string;
}

// Growth measurement types
export interface GrowthMeasurement {
  id: string;
  date: string; // ISO date string
  ageInDays: number; // Age in days from birth
  height?: number; // in cm
  weight?: number; // in grams
  headCircumference?: number; // in cm
  notes?: string;
  measuredBy?: string; // BVC, hemma, etc.
  childId: string; // Reference to child
  createdAt: string;
  updatedAt: string;
}

export interface CreateGrowthMeasurementRequest {
  date: string;
  height?: number;
  weight?: number;
  headCircumference?: number;
  notes?: string;
  measuredBy?: string;
}

export interface UpdateGrowthMeasurementRequest extends Partial<CreateGrowthMeasurementRequest> {
  id: string;
}

export interface GrowthStats {
  totalMeasurements: number;
  latestMeasurement?: GrowthMeasurement;
  growthTrends: {
    heightGrowthRate?: number; // cm per month
    weightGrowthRate?: number; // grams per month
    headGrowthRate?: number; // cm per month
  };
  percentileHistory: {
    date: string;
    heightPercentile?: number;
    weightPercentile?: number;
    headPercentile?: number;
  }[];
}