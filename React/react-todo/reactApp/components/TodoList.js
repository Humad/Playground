import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul>
                {this.props.todos.map((item) => {
                    return <Todo 
                        todoXClick={() => this.props.todoXClick(this.props.todos.indexOf(item))} 
                        todoToggle={() => this.props.todoToggle(this.props.todos.indexOf(item))} 
                        task={item} 
                        />
                    })
                }
            </ul>
        );
    }
}

export default TodoList;