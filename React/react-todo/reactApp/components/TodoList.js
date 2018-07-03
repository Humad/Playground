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
                        key={item._id}
                        todoXClick={() => this.props.todoXClick(item._id)} 
                        todoToggle={() => this.props.todoToggle(item._id)} 
                        task={item} 
                        />
                    })
                }
            </ul>
        );
    }
}

export default TodoList;