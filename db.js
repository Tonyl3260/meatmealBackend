const {
    Pool
} = require('pg');

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'meatmeal',
    password: 'test123',
    port: 5432,
});

module.exports = pool;