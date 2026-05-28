const db = require('../config/db');

// Listar rendimentos de um mês
const listarRendimentos = (req, res) => {
  const { mes_id } = req.params;
  db.query(
    'SELECT * FROM rendimentos WHERE mes_id = ? ORDER BY id',
    [mes_id],
    (err, results) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(results);
    }
  );
};

// Criar rendimento
const criarRendimento = (req, res) => {
  const { mes_id, nome, valor } = req.body;
  db.query(
    'INSERT INTO rendimentos (mes_id, nome, valor) VALUES (?, ?, ?)',
    [mes_id, nome, valor],
    (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ id: result.insertId, mes_id, nome, valor });
    }
  );
};

// Atualizar rendimento
const atualizarRendimento = (req, res) => {
  const { id } = req.params;
  const { nome, valor } = req.body;
  db.query(
    'UPDATE rendimentos SET nome = ?, valor = ? WHERE id = ?',
    [nome, valor, id],
    (err) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ mensagem: 'Rendimento atualizado!' });
    }
  );
};

// Apagar rendimento
const apagarRendimento = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM rendimentos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Rendimento apagado!' });
  });
};

module.exports = { listarRendimentos, criarRendimento, atualizarRendimento, apagarRendimento };