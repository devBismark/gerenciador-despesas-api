const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
const mesesRoutes = require('./src/routes/meses');
const despesasRoutes = require('./src/routes/despesas');
const rendimentosRoutes = require('./src/routes/rendimentos');

app.use('/meses', mesesRoutes);
app.use('/despesas', despesasRoutes);
app.use('/rendimentos', rendimentosRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ mensagem: '✅ API Gerenciador de Despesas funcionando!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});