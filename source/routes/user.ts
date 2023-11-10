import express from 'express';
import controller from '../controllers/user';
const router = express.Router();

router.get('/user/:username/expenses', controller.getExpenseReports);
router.post('/user/:username/add_expense', controller.addExpenseReport);

export = router;