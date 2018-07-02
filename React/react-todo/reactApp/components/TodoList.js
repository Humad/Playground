import React from 'react';

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

export default TodoList;