import { Router } from 'express';
import { getDailyStats, getWeeklyStats } from '../controllers/statsController';

const router = Router();

router.get('/daily/:date', getDailyStats);
router.get('/weekly/:startDate', getWeeklyStats);

export default router;