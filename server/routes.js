const express = require('express');
const router = express.Router();

const TodoController = require('./controllers/TodoController.js')

router.post('/save_todo', TodoController.save);
router.get('/get_todos', TodoController.fetch);
router.post('/delete_todo', TodoController.delete);
router.post('/get_todo', TodoController.getTodo);
router.post('/update_todo', TodoController.updateTodo)

module.exports = router;