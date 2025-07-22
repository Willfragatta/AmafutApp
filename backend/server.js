// Importa as dependências
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Importa os ficheiros de rota
const authRoutes = require('./routes/authRoutes');
const athleteRoutes = require('./routes/athleteRoutes');
const eventRoutes = require('./routes/eventRoutes');
const athleteAnalysisRoutes = require('./routes/athleteAnalysisRoutes');
const goalRoutes = require('./routes/goalRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const userRoutes = require('./routes/userRoutes');

// Carrega as variáveis de ambiente do ficheiro .env
dotenv.config();

// Conecta à base de dados
connectDB();

// Inicializa a aplicação Express
const app = express();

// Habilita o CORS para permitir pedidos do frontend
app.use(cors());

// Habilita o parser de JSON para o corpo dos pedidos
app.use(express.json());

// Rota de teste para verificar se o servidor está no ar
app.get('/', (req, res) => {
  res.send('API do AMAFUT App está a funcionar!');
});

// Monta as rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/athletes', athleteRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/athlete-analyses', athleteAnalysisRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);


// Define a porta do servidor. Usa a variável de ambiente ou 5000 como padrão.
const PORT = process.env.PORT || 5000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor a rodar na porta ${PORT} e conectado ao MongoDB`);
});