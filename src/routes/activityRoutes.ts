import { Router } from 'express';
import { 
  getAllActivities, 
  getActivitiesByType, 
  createActivity, 
  updateActivityData, 
  deleteActivityData, 
  getLatestActivity 
} from '../controllers/activityController';

const router = Router();

router.get('/', getAllActivities);
router.get('/type/:type', getActivitiesByType);
router.get('/latest/:type', getLatestActivity);
router.post('/', createActivity);
router.put('/:id', updateActivityData);
router.delete('/:id', deleteActivityData);

export default router;