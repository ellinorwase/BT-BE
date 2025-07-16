import { Router } from 'express';
import { getChild, createChild, updateChildData } from '../controllers/childController';

const router = Router();

router.get('/', getChild);
router.post('/', createChild);
router.put('/', updateChildData);

export default router;