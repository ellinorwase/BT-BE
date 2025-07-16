import { Request, Response } from 'express';
import { mockActivities } from '../utils/data';
import { DailyStats } from '../types';

export const getDailyStats = async (req: Request<{ date: string }>, res: Response) => {
  try {
    const { date } = req.params;
    console.log(`API: Fetching daily stats for ${date}`);
    
    setTimeout(() => {
      const dayActivities = mockActivities.filter(activity => activity.date === date);
      
      const stats: DailyStats = {
        totalFeedings: dayActivities.filter(a => a.type === 'feeding' || a.type === 'breastfeeding').length,
        totalSleep: dayActivities.filter(a => a.type === 'sleep').length,
        totalDiaperChanges: dayActivities.filter(a => a.type === 'diaper').length,
      };
      
      res.json(stats);
    }, 500);
  } catch (error) {
    console.error('Error fetching daily stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getWeeklyStats = async (req: Request<{ startDate: string }>, res: Response) => {
  try {
    const { startDate } = req.params;
    console.log(`API: Fetching weekly stats starting from ${startDate}`);
    
    setTimeout(() => {
      const weekStart = new Date(startDate);
      const weekEnd = new Date(startDate);
      weekEnd.setDate(weekEnd.getDate() + 7);
      const weekEndISO = weekEnd.toISOString().split('T')[0];
      
      const weekActivities = mockActivities.filter(activity => {
        return activity.date >= startDate && activity.date < weekEndISO;
      });
      
      res.json(weekActivities);
    }, 600);
  } catch (error) {
    console.error('Error fetching weekly stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};