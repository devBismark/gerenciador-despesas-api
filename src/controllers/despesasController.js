const db = require('../config/db');

// Listar despesas de um mês
const listarDespesas = (req, res) => {
  const { mes_id } = req.params;
  db.query(
    'SELECT * FROM despesas WHERE mes_id = ? ORDER BY id',
    [mes_id],
    (err, results) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(results);
    }
  );
};

// Criar despesa
const criarDespesa = (req, res) => {
  const { mes_id, conta, valor, pago, parcelas, parcela_atual } = req.body;
  db.query(
    'INSERT INTO despesas (mes_id, conta, valor, pago, parcelas, parcela_atual) VALUES (?, ?, ?, ?, ?, ?)',
    [mes_id, conta, valor, pago || false, parcelas || null, parcela_atual || null],
    (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ id: result.insertId, mes_id, conta, valor });
    }
  );
};

// Atualizar despesa
const atualizarDespesa = (req, res) => {
  const { id } = req.params;
  const { conta, valor, pago, parcelas, parcela_atual } = req.body;
  db.query(
    'UPDATE despesas SET conta = ?, valor = ?, pago = ?, parcelas = ?, parcela_atual = ? WHERE id = ?',
    [conta, valor, pago, parcelas, parcela_atual, id],
    (err) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ mensagem: 'Despesa atualizada!' });
    }
  );
};

// Apagar despesa
const apagarDespesa = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM despesas WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Despesa apagada!' });
  });
};

module.exports = { listarDespesas, criarDespesa, atualizarDespesa, apagarDespesa };