import { Router } from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByMonth
} from '../controllers/calendarController';

const router = Router();

// GET /api/calendar/events - Get all events with optional filtering
router.get('/events', getAllEvents);

// GET /api/calendar/events/month - Get events for a specific month
router.get('/events/month', getEventsByMonth);

// GET /api/calendar/events/:id - Get a specific event by ID
router.get('/events/:id', getEventById);

// POST /api/calendar/events - Create a new event
router.post('/events', createEvent);

// PUT /api/calendar/events/:id - Update an existing event
router.put('/events/:id', updateEvent);

// DELETE /api/calendar/events/:id - Delete an event
router.delete('/events/:id', deleteEvent);

export default router;