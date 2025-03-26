const express = require('express');
const router = express.Router();
const produceController = require('../controllers/produceController');

// Produce Routes
router.get('/', produceController.getProduce);
router.post('/add', produceController.addProduce);
router.delete('/delete/:id', produceController.deleteProduce);

module.exports = router;
