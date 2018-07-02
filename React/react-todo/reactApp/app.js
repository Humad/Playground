import React from 'react';
import ReactDOM from 'react-dom';

class Todo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<li><button>X</button>{this.props.task.completed ? <strike>{this.props.task.taskText}</strike> : this.props.task.taskText}</li>);
    }
}

class InputLine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <input type="text"></input>
                <button type="submit">Add todo</button>
            </div>
        )
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul>
                {this.props.todos.map((item) => {return <Todo task={item} />})}
            </ul>
        );
    }
}

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



ReactDOM.render(<TodoApp />,
    document.getElementById('root'));