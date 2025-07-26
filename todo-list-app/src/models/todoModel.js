const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.dbName,
});

class Todo {
    static async getAll() {
        const result = await pool.query('SELECT id, image, title, description, priority, "dueDate" FROM todos ORDER BY id ASC');
        return result.rows;
    }

    static async getById(id) {
        const result = await pool.query('SELECT id, image, title, description, priority, "dueDate" FROM todos WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async create(image, title, description, priority, dueDate) {
        const result = await pool.query(
            'INSERT INTO todos (image, title, description, priority, "dueDate") VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [image, title, description, priority, dueDate]
        );
        return result.rows[0];
    }

    static async update(id, image, title, description, priority, dueDate) {
        const result = await pool.query(
            'UPDATE todos SET image = $1, title = $2, description = $3, priority = $4, "dueDate" = $5 WHERE id = $6 RETURNING *',
            [image, title, description, priority, dueDate, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    }
}

module.exports = Todo;
