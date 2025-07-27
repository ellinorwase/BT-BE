import { Request, Response } from 'express';
import { 
  mockGrowthMeasurements, 
  mockChild,
  addGrowthMeasurement, 
  updateGrowthMeasurement, 
  deleteGrowthMeasurement,
  calculateAgeInDays
} from '../utils/data';
import { 
  GrowthMeasurement, 
  CreateGrowthMeasurementRequest, 
  UpdateGrowthMeasurementRequest,
  GrowthStats 
} from '../types';
import { v4 as uuidv4 } from 'uuid';

export const getAllMeasurements = (req: Request, res: Response) => {
  try {
    const { childId } = req.query;
    
    let filteredMeasurements = mockGrowthMeasurements;
    if (childId) {
      filteredMeasurements = mockGrowthMeasurements.filter(m => m.childId === childId);
    }
    
    console.log(`[Growth] Found ${filteredMeasurements.length} measurements`);
    res.json({ success: true, data: filteredMeasurements });
  } catch (error) {
    console.error('[Growth] Error fetching measurements:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getMeasurementById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const measurement = mockGrowthMeasurements.find(m => m.id === id);
    
    if (!measurement) {
      return res.status(404).json({ success: false, message: 'Measurement not found' });
    }
    
    console.log(`[Growth] Found measurement: ${id}`);
    res.json({ success: true, data: measurement });
  } catch (error) {
    console.error('[Growth] Error fetching measurement:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const createMeasurement = (req: Request, res: Response) => {
  try {
    const measurementData: CreateGrowthMeasurementRequest = req.body;
    const userId = req.headers['user-id'] as string || 'anonymous';
    
    // Calculate age in days
    const ageInDays = mockChild ? calculateAgeInDays(mockChild.birthDate, measurementData.date) : 0;
    
    const newMeasurement: GrowthMeasurement = {
      id: uuidv4(),
      ...measurementData,
      ageInDays,
      childId: mockChild?.id || 'default',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    addGrowthMeasurement(newMeasurement);
    
    console.log(`[Growth] Created measurement: ${newMeasurement.id}`);
    res.status(201).json({ 
      success: true, 
      data: newMeasurement, 
      message: 'Measurement created successfully' 
    });
  } catch (error) {
    console.error('[Growth] Error creating measurement:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateMeasurementById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates: Partial<CreateGrowthMeasurementRequest> = req.body;
    
    const existingMeasurement = mockGrowthMeasurements.find(m => m.id === id);
    if (!existingMeasurement) {
      return res.status(404).json({ success: false, message: 'Measurement not found' });
    }
    
    // Recalculate age if date changed
    let ageInDays = existingMeasurement.ageInDays;
    if (updates.date && mockChild) {
      ageInDays = calculateAgeInDays(mockChild.birthDate, updates.date);
    }
    
    const updatedData = {
      ...updates,
      ageInDays,
      updatedAt: new Date().toISOString()
    };
    
    updateGrowthMeasurement(id, updatedData);
    
    const updatedMeasurement = mockGrowthMeasurements.find(m => m.id === id);
    
    console.log(`[Growth] Updated measurement: ${id}`);
    res.json({ 
      success: true, 
      data: updatedMeasurement, 
      message: 'Measurement updated successfully' 
    });
  } catch (error) {
    console.error('[Growth] Error updating measurement:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteMeasurementById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const existingMeasurement = mockGrowthMeasurements.find(m => m.id === id);
    if (!existingMeasurement) {
      return res.status(404).json({ success: false, message: 'Measurement not found' });
    }
    
    deleteGrowthMeasurement(id);
    
    console.log(`[Growth] Deleted measurement: ${id}`);
    res.json({ 
      success: true, 
      data: existingMeasurement, 
      message: 'Measurement deleted successfully' 
    });
  } catch (error) {
    console.error('[Growth] Error deleting measurement:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getGrowthStats = (req: Request, res: Response) => {
  try {
    const { childId } = req.params;
    
    const childMeasurements = mockGrowthMeasurements
      .filter(m => m.childId === childId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const latestMeasurement = childMeasurements[childMeasurements.length - 1];
    
    // Calculate growth trends (simplified)
    const growthTrends: any = {};
    if (childMeasurements.length >= 2) {
      const firstMeasurement = childMeasurements[0];
      const timeDiffMonths = (new Date(latestMeasurement.date).getTime() - new Date(firstMeasurement.date).getTime()) / (1000 * 60 * 60 * 24 * 30.44);
      
      if (latestMeasurement.height && firstMeasurement.height && timeDiffMonths > 0) {
        growthTrends.heightGrowthRate = (latestMeasurement.height - firstMeasurement.height) / timeDiffMonths;
      }
      if (latestMeasurement.weight && firstMeasurement.weight && timeDiffMonths > 0) {
        growthTrends.weightGrowthRate = (latestMeasurement.weight - firstMeasurement.weight) / timeDiffMonths;
      }
      if (latestMeasurement.headCircumference && firstMeasurement.headCircumference && timeDiffMonths > 0) {
        growthTrends.headGrowthRate = (latestMeasurement.headCircumference - firstMeasurement.headCircumference) / timeDiffMonths;
      }
    }
    
    // TODO: Calculate actual percentiles based on WHO data
    const percentileHistory = childMeasurements.map(measurement => ({
      date: measurement.date,
      heightPercentile: measurement.height ? 50 : undefined, // Placeholder
      weightPercentile: measurement.weight ? 50 : undefined, // Placeholder
      headPercentile: measurement.headCircumference ? 50 : undefined // Placeholder
    }));
    
    const stats: GrowthStats = {
      totalMeasurements: childMeasurements.length,
      latestMeasurement,
      growthTrends,
      percentileHistory
    };
    
    console.log(`[Growth] Generated stats for child: ${childId}`);
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('[Growth] Error generating stats:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};