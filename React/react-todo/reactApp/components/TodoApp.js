import React from 'react';
import InputLine from './InputLine';
import TodoList from './TodoList';

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
        this.setState({
            todos: [
                {taskText: "Come to SF", completed: true},
                {taskText: "Master React", completed: false},
                {taskText: "Sleep", completed: false}
            ]
        });
    }

    addTodo(todo) {

        var dummyData = this.state.todos.slice();
        dummyData.push({taskText: todo, completed: false});

        this.setState({
            todos: dummyData
        });
    }

    removeTodo(index) {
        var dummyData = this.state.todos.slice();
        dummyData.splice(index, 1);
        this.setState({
            todos: dummyData
        });
    }

    toggleTodo(index) {
        var dummyData = this.state.todos.slice();
        dummyData[index].completed = !dummyData[index].completed;
        this.setState({
            todos: dummyData
        });
    }

    render() {
        return (
            <div>
                <InputLine submit={(str) => this.addTodo(str)}/>
                <TodoList 
                    todoXClick={(index) => this.removeTodo(index)} 
                    todoToggle={(index) => this.toggleTodo(index)} 
                    todos={this.state.todos} 
                />
            </div>
        );
    }
}

export default TodoApp;