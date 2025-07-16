import { Request, Response } from 'express';
import { mockActivities, addActivity, updateActivity, deleteActivity, sortActivities } from '../utils/data';
import { Activity, CreateActivityRequest } from '../types';

export const getAllActivities = async (req: Request, res: Response) => {
  try {
    console.log('API: Fetching all activities');
    
    setTimeout(() => {
      const sorted = sortActivities([...mockActivities]);
      res.json(sorted);
    }, 400);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getActivitiesByType = async (req: Request<{ type: string }>, res: Response) => {
  try {
    const { type } = req.params;
    console.log(`API: Fetching activities of type: ${type}`);
    
    setTimeout(() => {
      const filtered = mockActivities.filter(activity => activity.type === type);
      const sorted = sortActivities(filtered);
      res.json(sorted);
    }, 200);
  } catch (error) {
    console.error('Error fetching activities by type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createActivity = async (req: Request<{}, Activity, CreateActivityRequest>, res: Response) => {
  try {
    console.log('==== API: Creating activity ====');
    console.log('Received activity type:', req.body.type);
    console.log('Received activity date:', req.body.date);
    console.log('Received activity details:', req.body.details);
    console.log('Full received activity:', req.body);
    
    const newActivity: Activity = {
      ...req.body,
      id: Date.now().toString(),
    };
    
    console.log('==== API: Created activity object ====');
    console.log('Created activity ID:', newActivity.id);
    console.log('Created activity date:', newActivity.date);
    console.log('Created activity type:', newActivity.type);
    console.log('Full created activity:', newActivity);
    
    setTimeout(() => {
      addActivity(newActivity);
      console.log('Activity added to mock storage');
      res.status(201).json(newActivity);
    }, 300);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateActivityData = async (req: Request<{ id: string }, Activity, Partial<Activity>>, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`API: Updating activity ${id}`, req.body);
    
    setTimeout(() => {
      const activityIndex = mockActivities.findIndex(a => a.id === id);
      if (activityIndex === -1) {
        return res.status(404).json({ error: 'Activity not found' });
      }
      
      updateActivity(id, req.body);
      res.json(mockActivities[activityIndex]);
    }, 400);
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteActivityData = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`API: Deleting activity ${id}`);
    
    setTimeout(() => {
      const activityExists = mockActivities.some(a => a.id === id);
      if (!activityExists) {
        return res.status(404).json({ error: 'Activity not found' });
      }
      
      deleteActivity(id);
      res.status(204).send();
    }, 300);
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLatestActivity = async (req: Request<{ type: string }>, res: Response) => {
  try {
    const { type } = req.params;
    console.log(`API: Fetching latest activity of type: ${type}`);
    
    setTimeout(() => {
      const filtered = mockActivities.filter(activity => activity.type === type);
      const sorted = sortActivities(filtered);
      res.json(sorted[0] || null);
    }, 150);
  } catch (error) {
    console.error('Error fetching latest activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};