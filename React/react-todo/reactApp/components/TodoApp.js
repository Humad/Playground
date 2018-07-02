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

    render() {
        return (
            <div>
                <InputLine submit={(str) => this.addTodo(str)}/>
                <TodoList todos={this.state.todos} />
            </div>
        );
    }
}

export default TodoApp;