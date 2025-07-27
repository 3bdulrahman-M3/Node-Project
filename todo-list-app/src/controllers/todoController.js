const Todo = require('../models/todoModel');

const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.getAll();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    }
};

const createTodo = async (req, res) => {
    const { image, title, description, priority, dueDate } = req.body;
    try {
        const newTodo = await Todo.create(image, title, description, priority, dueDate);
        res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create todo', details: error.message });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { image, title, description, priority, dueDate } = req.body;
    try {
        const updatedTodo = await Todo.update(id, image, title, description, priority, dueDate);
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo updated successfully', todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo', details: error.message });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Todo.delete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo', details: error.message });
    }
};

module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
}; 