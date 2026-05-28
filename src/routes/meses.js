const express = require('express');
const router = express.Router();
const { listarMeses, criarMes, atualizarMes, apagarMes } = require('../controllers/mesesController');

router.get('/', listarMeses);
router.post('/', criarMes);
router.put('/:id', atualizarMes);
router.delete('/:id', apagarMes);

module.exports = router;