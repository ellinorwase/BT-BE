import { Router } from 'express';
import childRoutes from './childRoutes';
import activityRoutes from './activityRoutes';
import statsRoutes from './statsRoutes';
import calendarRoutes from './calendarRoutes';

const router = Router();

router.use('/api/child', childRoutes);
router.use('/api/activities', activityRoutes);
router.use('/api/stats', statsRoutes);
router.use('/api/calendar', calendarRoutes);

export default router;