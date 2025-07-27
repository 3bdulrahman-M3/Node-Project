const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  image: String,
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  dueDate: Date
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

class TodoModel {
  static async getAll() {
    return Todo.find().sort({ _id: 1 });
  }

  static async getById(id) {
    return Todo.findById(id);
  }

  static async create(image, title, description, priority, dueDate) {
    const todo = new Todo({ image, title, description, priority, dueDate });
    return todo.save();
  }

  static async update(id, image, title, description, priority, dueDate) {
    return Todo.findByIdAndUpdate(
      id,
      { image, title, description, priority, dueDate },
      { new: true }
    );
  }

  static async delete(id) {
    return Todo.findByIdAndDelete(id);
  }
}

module.exports = TodoModel;
