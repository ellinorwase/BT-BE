import { Request, Response } from 'express';
import { CalendarEvent, CreateEventRequest, UpdateEventRequest, EventType } from '../types';

// Mock data store - In production, this would be a database
let events: CalendarEvent[] = [
  {
    id: '1',
    title: 'BVC kontroll',
    description: 'Rutinkontroll för barnet',
    startDate: '2024-01-15T10:00:00.000Z',
    endDate: '2024-01-15T11:00:00.000Z',
    allDay: false,
    type: EventType.BVC,
    location: 'Vårdcentralen',
    reminderMinutes: 60,
    createdBy: 'user1',
    createdAt: '2024-01-10T08:00:00.000Z',
    updatedAt: '2024-01-10T08:00:00.000Z',
  },
  {
    id: '2',
    title: 'Vaccination',
    description: '3-månaders vaccination',
    startDate: '2024-01-20T14:30:00.000Z',
    endDate: '2024-01-20T15:00:00.000Z',
    allDay: false,
    type: EventType.VACCINATION,
    location: 'Vårdcentralen',
    reminderMinutes: 30,
    createdBy: 'user1',
    createdAt: '2024-01-12T10:00:00.000Z',
    updatedAt: '2024-01-12T10:00:00.000Z',
  },
];

export const getAllEvents = (req: Request, res: Response) => {
  try {
    const { startDate, endDate, userId } = req.query;
    
    let filteredEvents = events;
    
    // Filter by user if provided (for parent sharing)
    if (userId) {
      filteredEvents = filteredEvents.filter(event => event.createdBy === userId);
    }
    
    // Filter by date range if provided
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      
      filteredEvents = filteredEvents.filter(event => {
        const eventStart = new Date(event.startDate);
        return eventStart >= start && eventStart <= end;
      });
    }
    
    res.json({
      success: true,
      data: filteredEvents.sort((a, b) => 
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getEventById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = events.find(e => e.id === id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const createEvent = (req: Request, res: Response) => {
  try {
    const eventData: CreateEventRequest = req.body;
    
    // Validate required fields
    if (!eventData.title || !eventData.startDate || !eventData.endDate) {
      return res.status(400).json({
        success: false,
        message: 'Title, start date, and end date are required'
      });
    }
    
    // Validate dates
    const startDate = new Date(eventData.startDate);
    const endDate = new Date(eventData.endDate);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }
    
    if (startDate >= endDate) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }
    
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      ...eventData,
      createdBy: req.headers['user-id'] as string || 'anonymous', // In production, get from auth
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    events.push(newEvent);
    
    res.status(201).json({
      success: true,
      data: newEvent,
      message: 'Event created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateEvent = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Partial<CreateEventRequest> = req.body;
    
    const eventIndex = events.findIndex(e => e.id === id);
    
    if (eventIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    const existingEvent = events[eventIndex];
    
    // Validate dates if provided
    if (updateData.startDate || updateData.endDate) {
      const startDate = new Date(updateData.startDate || existingEvent.startDate);
      const endDate = new Date(updateData.endDate || existingEvent.endDate);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid date format'
        });
      }
      
      if (startDate >= endDate) {
        return res.status(400).json({
          success: false,
          message: 'End date must be after start date'
        });
      }
    }
    
    const updatedEvent: CalendarEvent = {
      ...existingEvent,
      ...updateData,
      id, // Ensure ID doesn't change
      createdBy: existingEvent.createdBy, // Ensure creator doesn't change
      createdAt: existingEvent.createdAt, // Ensure creation date doesn't change
      updatedAt: new Date().toISOString(),
    };
    
    events[eventIndex] = updatedEvent;
    
    res.json({
      success: true,
      data: updatedEvent,
      message: 'Event updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update event',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const deleteEvent = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const eventIndex = events.findIndex(e => e.id === id);
    
    if (eventIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    const deletedEvent = events[eventIndex];
    events.splice(eventIndex, 1);
    
    res.json({
      success: true,
      data: deletedEvent,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete event',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getEventsByMonth = (req: Request, res: Response) => {
  try {
    const { year, month, userId } = req.query;
    
    if (!year || !month) {
      return res.status(400).json({
        success: false,
        message: 'Year and month are required'
      });
    }
    
    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59);
    
    let filteredEvents = events.filter(event => {
      const eventStart = new Date(event.startDate);
      return eventStart >= startDate && eventStart <= endDate;
    });
    
    // Filter by user if provided
    if (userId) {
      filteredEvents = filteredEvents.filter(event => event.createdBy === userId);
    }
    
    res.json({
      success: true,
      data: filteredEvents.sort((a, b) => 
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events for month',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};