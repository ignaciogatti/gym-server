const express = require('express');

const gym_app_controller = require('../controllers/gym_app_controller')

const router = express.Router();

router.get('/getClients', gym_app_controller.getClients);
router.get('/getClient/:dni', gym_app_controller.getClient);
router.post('/updateClient', gym_app_controller.updateClient);
router.delete('/deleteClient', gym_app_controller.deleteClient);
router.post('/putClient', gym_app_controller.putClient);
router.post('/putPayment', gym_app_controller.putPayment);

module.exports = router