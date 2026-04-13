// src/database/dbConfig.js

const { Pool } = require('pg');
require('dotenv').config();

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432, // Porta padrão do PostgreSQL
});

const connectWithRetry = () => {
    pool.query('SELECT NOW()', (err, res) => {
        if (err) {
            console.error('Banco ainda não disponível, tentando novamente...');
            setTimeout(connectWithRetry, 3000);
        } else {
            console.log('Conexão com PostgreSQL estabelecida:', res.rows[0].now);
        }
    });
};

connectWithRetry();

module.exports = {
    pool,
};
