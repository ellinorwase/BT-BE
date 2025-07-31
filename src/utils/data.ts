import { Child, Activity, CalendarEvent, GrowthMeasurement, EventType } from '../types';

const today = new Date();
const todayISO = today.toISOString().split('T')[0];
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayISO = yesterday.toISOString().split('T')[0];

export let mockChild: Child = {
  id: '1',
  name: 'Ella',
  birthDate: '2024-04-10',
  age: '3 månader, 2 dagar',
  gender: 'female'
};

export let mockActivities: Activity[] = [
  {
    id: '1',
    type: 'feeding',
    date: todayISO,
    details: { selectedTime: '12:45', amount: 120, notes: 'flaska' }
  },
  {
    id: '2', 
    type: 'breastfeeding',
    date: todayISO,
    details: { selectedTime: '10:20', breast: 'left' }
  },
  {
    id: '3',
    type: 'diaper',
    date: todayISO,
    details: { selectedTime: '14:10', diaperType: ['poop', 'pee'] }
  },
  {
    id: '4',
    type: 'sleep',
    date: todayISO,
    details: { startTime: '13:00', endTime: '14:00' }
  },
  {
    id: '40',
    type: 'sleep',
    date: todayISO,
    details: { startTime: '18:00', endTime: '20:00' }
  },
  {
    id: '5',
    type: 'wakeup',
    date: todayISO,
    details: { selectedTime: '06:45' }
  },
  {
    id: '6',
    type: 'bedtime',
    date: yesterdayISO,
    details: { selectedTime: '20:15' }
  },
  {
    id: '7',
    type: 'feeding',
    date: todayISO,
    details: { selectedTime: '08:30', amount: 100, notes: 'flaska' }
  },
  {
    id: '8',
    type: 'diaper',
    date: todayISO,
    details: { selectedTime: '09:15', diaperType: ['pee'] }
  },
  {
    id: '9',
    type: 'breastfeeding',
    date: todayISO,
    details: { selectedTime: '15:30', breast: 'right' }
  },
  {
    id: '10',
    type: 'diaper',
    date: todayISO,
    details: { selectedTime: '16:45', diaperType: ['poop'] }
  },
  {
    id: 'y1',
    type: 'wakeup',
    date: yesterdayISO,
    details: { selectedTime: '07:00' }
  },
  {
    id: 'y2',
    type: 'feeding',
    date: yesterdayISO,
    details: { selectedTime: '07:30', amount: 150 }
  },
  {
    id: 'y3',
    type: 'diaper',
    date: yesterdayISO,
    details: { selectedTime: '08:00', diaperType: ['pee'] }
  },
  {
    id: 'y4',
    type: 'sleep',
    date: yesterdayISO,
    details: { startTime: '09:00', endTime: '11:00' }
  },
  {
    id: 'y5',
    type: 'breastfeeding',
    date: yesterdayISO,
    details: { selectedTime: '11:30', breast: 'left' }
  },
  {
    id: 'y6',
    type: 'medicine',
    date: yesterdayISO,
    details: { selectedTime: '12:00', medicine: 'D-vitamin', dosage: '5 droppar' }
  },
  {
    id: 'y7',
    type: 'feeding',
    date: yesterdayISO,
    details: { selectedTime: '14:30', amount: 180 }
  },
  {
    id: 'y8',
    type: 'sleep',
    date: yesterdayISO,
    details: { startTime: '15:00', endTime: '16:30' }
  },
  {
    id: 'y9',
    type: 'bedtime',
    date: yesterdayISO,
    details: { selectedTime: '19:00' }
  },
  {
    id: 'y10',
    type: 'bath',
    date: yesterdayISO,
    details: { selectedTime: '18:30' }
  }
];

// Mock calendar events
export let mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'BVC-besök',
    description: 'Rutinkontroll med sköterska',
    startDate: '2024-07-30T10:00:00.000Z',
    endDate: '2024-07-30T11:00:00.000Z',
    allDay: false,
    type: EventType.BVC,
    location: 'Vårdcentralen',
    reminderMinutes: 30,
    createdBy: 'user-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Vaccination',
    description: '3-månadersspruta',
    startDate: '2024-08-05T14:30:00.000Z',
    endDate: '2024-08-05T15:00:00.000Z',
    allDay: false,
    type: EventType.VACCINATION,
    location: 'BVC',
    reminderMinutes: 60,
    createdBy: 'user-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock growth measurements
export let mockGrowthMeasurements: GrowthMeasurement[] = [
  {
    id: '1',
    date: '2024-04-10',
    ageInDays: 0,
    height: 49.5,
    weight: 3200,
    headCircumference: 34.2,
    notes: 'Födelse',
    measuredBy: 'BB',
    childId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    date: '2024-05-10',
    ageInDays: 30,
    height: 53.1,
    weight: 4100,
    headCircumference: 36.8,
    notes: '1-månaderskontroll',
    measuredBy: 'BVC',
    childId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    date: '2024-06-10',
    ageInDays: 61,
    height: 56.2,
    weight: 5200,
    headCircumference: 38.5,
    notes: '2-månaderskontroll',
    measuredBy: 'BVC',
    childId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const updateChild = (child: Child) => {
  mockChild = { ...child };
};

export const addActivity = (activity: Activity) => {
  mockActivities = [activity, ...mockActivities];
};

export const updateActivity = (id: string, updates: Partial<Activity>) => {
  const index = mockActivities.findIndex(a => a.id === id);
  if (index !== -1) {
    mockActivities[index] = { ...mockActivities[index], ...updates };
  }
};

export const deleteActivity = (id: string) => {
  mockActivities = mockActivities.filter(a => a.id !== id);
};

export const sortActivities = (activities: Activity[]) => {
  return activities.sort((a, b) => {
    const dateCompare = (b.date || '').localeCompare(a.date || '');
    if (dateCompare !== 0) return dateCompare;
    const aTime = a.details?.selectedTime || a.details?.startTime || '00:00';
    const bTime = b.details?.selectedTime || b.details?.startTime || '00:00';
    return bTime.localeCompare(aTime);
  });
};

// Calendar event helper functions
export const addCalendarEvent = (event: CalendarEvent) => {
  mockCalendarEvents = [event, ...mockCalendarEvents];
};

export const updateCalendarEvent = (id: string, updates: Partial<CalendarEvent>) => {
  const index = mockCalendarEvents.findIndex(e => e.id === id);
  if (index !== -1) {
    mockCalendarEvents[index] = { ...mockCalendarEvents[index], ...updates };
  }
};

export const deleteCalendarEvent = (id: string) => {
  mockCalendarEvents = mockCalendarEvents.filter(e => e.id !== id);
};

// Growth measurement helper functions
export const addGrowthMeasurement = (measurement: GrowthMeasurement) => {
  mockGrowthMeasurements = [measurement, ...mockGrowthMeasurements];
};

export const updateGrowthMeasurement = (id: string, updates: Partial<GrowthMeasurement>) => {
  const index = mockGrowthMeasurements.findIndex(m => m.id === id);
  if (index !== -1) {
    mockGrowthMeasurements[index] = { ...mockGrowthMeasurements[index], ...updates };
  }
};

export const deleteGrowthMeasurement = (id: string) => {
  mockGrowthMeasurements = mockGrowthMeasurements.filter(m => m.id !== id);
};

// Utility functions
export const calculateAgeInDays = (birthDate: string, measurementDate: string): number => {
  const birth = new Date(birthDate);
  const measurement = new Date(measurementDate);
  const diffTime = Math.abs(measurement.getTime() - birth.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const calculateAge = (birthDate: string): string => {
  const birth = new Date(birthDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - birth.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `${diffDays} dagar`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} månad${months !== 1 ? 'er' : ''}`;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;
    const months = Math.floor(remainingDays / 30);
    if (months > 0) {
      return `${years} år, ${months} månad${months !== 1 ? 'er' : ''}`;
    }
    return `${years} år`;
  }
};