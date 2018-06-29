import React from 'react';
import ChatRoom from './ChatRoom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(),
      roomName: "No room selected!"
    };
  }

  componentDidMount() {
    // WebSockets Receiving Event Handlers
    this.state.socket.on('connect', () => {
      console.log('connected');
      let username = prompt("Enter your username");
      this.setState({
        username: username
      });

      this.state.socket.emit('username', username);
    });

    this.state.socket.on('errorMessage', message => {
      alert(message);
    });
  }

  join(room) {
    this.setState({
      roomName: room
    });
    this.state.socket.emit("room", room);
  }

  render() {
    return (
      <div>
        <h1>{this.state.roomName} - {this.state.username}</h1>
        <button className="btn btn-default" onClick={() => this.join("Party Place")}>
          Join the Party Place
        </button>

        <ChatRoom socket={this.state.socket} roomName={this.state.roomName} username={this.state.username} />
      </div>
    );
  }
}

export default App;