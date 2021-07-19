const express = require('express');

const gym_app_controller = require('../controllers/gym_app_controller');
const payment_controller = require('../controllers/payment_controller')
const plan_controller = require('../controllers/plan_controller')

const router = express.Router();

router.get('/getClients', gym_app_controller.getClients);
router.get('/getClient/:dni', gym_app_controller.getClient);
router.post('/updateClient', gym_app_controller.updateClient);
router.delete('/deleteClient', gym_app_controller.deleteClient);
router.post('/putClient', gym_app_controller.putClient);
router.post('/putPayment', payment_controller.putPayment);
router.get('/getClientPayments/:dni', payment_controller.getClientPayments);
router.get('/getPayments', payment_controller.getPayments);
router.get('/getPlans', plan_controller.getPlans);
router.post('/updatePlan', plan_controller.updatePlan);
router.delete('/deletePlan', plan_controller.deletePlan);
router.post('/putPlan', plan_controller.putPlan);

module.exports = router