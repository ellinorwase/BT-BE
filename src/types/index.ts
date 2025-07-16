export interface Child {
  id: string;
  name: string;
  birthDate: string;
  age: string;
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