const express = require('express');
const router = express.Router();
const { listarRendimentos, criarRendimento, atualizarRendimento, apagarRendimento } = require('../controllers/rendimentosController');

router.get('/:mes_id', listarRendimentos);
router.post('/', criarRendimento);
router.put('/:id', atualizarRendimento);
router.delete('/:id', apagarRendimento);

module.exports = router;