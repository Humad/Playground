import React from 'react';

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            messages: []
        };
    }

    componentDidMount() {
        this.props.socket.on("message", (message)=> {
            var newMessages = this.state.messages.slice();
            console.log(message);
            newMessages.push(`${message.username}: ${message.content}`);
            this.setState({
                messages: newMessages
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.roomName !== this.props.roomName) {
            this.setState({
                message: "",
                messages: []
            });
        }  
    }

    send() {
        let message = this.state.message;
        let messages = this.state.messages;
        let username = this.props.username;

        this.setState({
            message: "",
            messages: [...messages, `*${username}: ${message}`]
        });

        this.props.socket.emit("message", message);
    }

    render() {
        return <div>
            <pre>
                {this.state.messages.map(message => message+"\n")}
            </pre>
            <input value={this.state.message} onChange={(event) => this.setState({message: event.target.value})}/>
            <button onClick={() => this.send()}>SEND</button>
        </div>
    }
}


export default ChatRoom;