const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { getAllTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

const router = express.Router();

router.get('/todos', verifyToken, getAllTodos);
router.post('/todos', verifyToken, createTodo);
router.put('/todos/:id', verifyToken, updateTodo);
router.delete('/todos/:id', verifyToken, deleteTodo);

module.exports = router;
