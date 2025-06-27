import express from 'express';
import app from './app';

const PORT = 3001; // Porta fixa para evitar problemas

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

