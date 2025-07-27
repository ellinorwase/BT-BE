import { Router } from 'express';
import { 
  getAllMeasurements,
  getMeasurementById,
  createMeasurement,
  updateMeasurementById,
  deleteMeasurementById,
  getGrowthStats
} from '../controllers/growthController';

const router = Router();

// GET /api/growth/measurements - Get all measurements (with optional childId filter)
router.get('/measurements', getAllMeasurements);

// GET /api/growth/measurements/:id - Get specific measurement
router.get('/measurements/:id', getMeasurementById);

// POST /api/growth/measurements - Create new measurement
router.post('/measurements', createMeasurement);

// PUT /api/growth/measurements/:id - Update measurement
router.put('/measurements/:id', updateMeasurementById);

// DELETE /api/growth/measurements/:id - Delete measurement
router.delete('/measurements/:id', deleteMeasurementById);

// GET /api/growth/stats/:childId - Get growth statistics for a child
router.get('/stats/:childId', getGrowthStats);

export default router;