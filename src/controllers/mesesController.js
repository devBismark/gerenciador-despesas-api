const db = require('../config/db');

const listarMeses = (req, res) => {
  console.log('📋 Recebeu pedido GET /meses');
  db.query('SELECT * FROM meses ORDER BY id', (err, results) => {
    console.log('📋 Query executada', err, results);
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
};

const criarMes = (req, res) => {
  const { nome, saldo_anterior } = req.body;
  db.query(
    'INSERT INTO meses (nome, saldo_anterior) VALUES (?, ?)',
    [nome, saldo_anterior || 0],
    (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ id: result.insertId, nome, saldo_anterior });
    }
  );
};

const atualizarMes = (req, res) => {
  const { id } = req.params;
  const { saldo_anterior } = req.body;
  db.query(
    'UPDATE meses SET saldo_anterior = ? WHERE id = ?',
    [saldo_anterior, id],
    (err) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ mensagem: 'Mês atualizado!' });
    }
  );
};

const apagarMes = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM meses WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Mês apagado!' });
  });
};

module.exports = { listarMeses, criarMes, atualizarMes, apagarMes };