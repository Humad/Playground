import React from 'react';
import ReactDOM from 'react-dom';

var dummyData = ["Come to SF", "Master React", "Sleep"];

class Todo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<li><button>X</button>{this.props.task}</li>);
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
        <ul>
            {dummyData.map((item) => {return <Todo task={item} />})}
        </ul>
        );
    }
}

ReactDOM.render(<TodoList />,
    document.getElementById('root'));