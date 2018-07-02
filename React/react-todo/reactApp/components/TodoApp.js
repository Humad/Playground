import React from 'react';
import InputLine from './InputLine';
import TodoList from './TodoList';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
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

    render() {
        return (
            <div>
                <InputLine />
                <TodoList todos={this.state.todos} />
            </div>
        );
    }
}