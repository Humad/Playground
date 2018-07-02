import React from 'react';

class InputLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            typedText: ""
        }

        this.handleTyping = this.handleTyping.bind(this);
        this.submitTodo = this.submitTodo.bind(this);
    }

    handleTyping(event) {
        let typedText = event.target.value;
        this.setState({
            typedText: typedText
        });
    }

    submitTodo() {
        this.props.submit(this.state.typedText);
        this.setState({
            typedText: ""
        });
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.typedText} onChange={this.handleTyping}></input>
                <button type="submit" onClick={this.submitTodo}>Add todo</button>
            </div>
        )
    }
}

export default InputLine;