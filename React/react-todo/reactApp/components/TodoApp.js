import React from 'react';
import InputLine from './InputLine';
import TodoList from './TodoList';
import axios from 'axios';

const dbUrl = "http://localhost:3000/db";

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }

        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
    }

    componentDidMount() {
        axios.get(dbUrl + "/all")
        .then(function (response) {
            console.log("Success:", response);
            this.setState({
                todos: response.data
            });
        }.bind(this))
        .catch(function (error) {
            console.log("Error:",error);
        });  
    }

    addTodo(todo) {
        console.log(todo);
        axios.post(dbUrl + "/add", {task: todo})
        .then(function (response) {
            console.log("Success:", response);
            var tempData = this.state.todos.slice();
            tempData.push(response.data);
            this.setState({
                todos: tempData
            });
        }.bind(this))
        .catch(function (error) {
            console.log("Error:",error);
        });  
    }

    removeTodo(id) {
        console.log(id);
        axios.post(dbUrl + "/remove", {id: id})
        .then(function(response) {
            console.log("Removed todo", response);
            var tempData = this.state.todos.filter(function(item) {
                return item._id !== id;
            });
            
            this.setState({
                todos: tempData
            });
        }.bind(this))
        .catch(function(error) {
            console.log("Error:", error);
        });
    }

    toggleTodo(id) {
        axios.post(dbUrl + "/toggle", {id: id})
        .then(function(response) {
            console.log("Toggled todo", response);
            var tempData = this.state.todos;
            tempData.forEach(function(item) {
                if (item._id === id) {
                    item.completed = !item.completed
                }
            });

            this.setState({
                todos: tempData
            });
        }.bind(this))
        .catch(function(error) {
            console.log("Error:", error);
        });
    }

    render() {
        return (
            <div>
                <InputLine submit={(str) => this.addTodo(str)}/>
                <TodoList 
                    todoXClick={(id) => this.removeTodo(id)} 
                    todoToggle={(id) => this.toggleTodo(id)} 
                    todos={this.state.todos} 
                />
            </div>
        );
    }
}

export default TodoApp;