import React from 'react';

class Todo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <button onClick={() => this.props.todoXClick()}>X</button>
                <span onClick={() => this.props.todoToggle()}>{this.props.task.completed ? <strike>{this.props.task.taskText}</strike> : this.props.task.taskText}</span>
            </li>
        );
    }
}

export default Todo;