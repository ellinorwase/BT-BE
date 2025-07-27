import { Router } from 'express';
import childRoutes from './childRoutes';
import activityRoutes from './activityRoutes';
import statsRoutes from './statsRoutes';
import calendarRoutes from './calendarRoutes';
import growthRoutes from './growthRoutes';

const router = Router();

router.use('/api/child', childRoutes);
router.use('/api/activities', activityRoutes);
router.use('/api/stats', statsRoutes);
router.use('/api/calendar', calendarRoutes);
router.use('/api/growth', growthRoutes);

export default router;