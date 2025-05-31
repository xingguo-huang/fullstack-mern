import express from 'express';
import { 
    generateLessonPlan,
    reviseLessonPlan,
    generateArtifact
} from '../controllers/lessonPlanController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', authenticateUser, generateLessonPlan);
router.post('/revise', authenticateUser, reviseLessonPlan);
router.post('/artifact', authenticateUser, generateArtifact);

export default router; 