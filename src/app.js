const express = require('express');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
app.use(express.json());  // Para lidar com JSON nas requisições

// Rotas
app.use('/api/images', imageRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


