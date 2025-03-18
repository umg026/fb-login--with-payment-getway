import express from 'express';
import { addPlan, getPlans, planDetails } from '../controller/subscriptionController.js';
import { AuthCheck } from '../middleware/checkAuth.js';
const subscriptionRouter = express.Router();

subscriptionRouter.post('/add-plan', addPlan);
subscriptionRouter.get('/get-plan', getPlans);
subscriptionRouter.get('/get-plan-details', AuthCheck, planDetails);


export { subscriptionRouter };