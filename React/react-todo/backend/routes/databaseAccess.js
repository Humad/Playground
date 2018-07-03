const express = require('express');
const router = express.Router();
const TodoItem = require('../models/TodoItem');

router.get('/all', function(req, res) {
    TodoItem.find({})
    .then(response => {
        res.send(response);
    })
    .catch(error => {
        res.send(error);
    });
});

router.post('/add', function(req, res) {
    const newTodo = new TodoItem({
        task: req.body.task
    });
    
    newTodo.save()
    .then(response => {
        res.send(response);
    })
    .catch(error => {
        res.send(error);
    });
});

router.post('/toggle', function(req, res) {
    TodoItem.findOne({_id: req.body.id})
    .then(response => {
        response.completed = !response.completed;
        response.save();
        res.send(response);
    })
    .catch(error => {
        res.send(error);
    });
});

router.post('/remove', function(req, res) {
    TodoItem.findOneAndRemove({_id: req.body.id})
    .then(response => {
        res.send("Removed!");
    })
    .catch(error => {
        res.send(error);
    })
});

module.exports = router;   