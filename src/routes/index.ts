import { Router } from 'express';
import childRoutes from './childRoutes';
import activityRoutes from './activityRoutes';
import statsRoutes from './statsRoutes';

const router = Router();

router.use('/api/child', childRoutes);
router.use('/api/activities', activityRoutes);
router.use('/api/stats', statsRoutes);

export default router;