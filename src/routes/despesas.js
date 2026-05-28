const express = require('express');
const router = express.Router();
const { listarDespesas, criarDespesa, atualizarDespesa, apagarDespesa } = require('../controllers/despesasController');

router.get('/:mes_id', listarDespesas);
router.post('/', criarDespesa);
router.put('/:id', atualizarDespesa);
router.delete('/:id', apagarDespesa);

module.exports = router;