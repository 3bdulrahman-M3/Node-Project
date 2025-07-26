const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const config = require('../config');

const pool = new Pool({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.dbName,
});

class User {
    static async create({ phone, password, displayName, experienceYears, address, level }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (phone, password, "displayName", "experienceYears", address, level) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [phone, hashedPassword, displayName, experienceYears, address, level]
        );
        return result.rows[0];
    }

    static async findByPhone(phone) {
        const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
        return result.rows[0];
    }

    static async comparePassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = User;