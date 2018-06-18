/////////////////
// Local state //
/////////////////
class DisplayMessages extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: '',
        messages: []
      }
  
      this.handleChange = this.handleChange.bind(this);
      this.submitMessage = this.submitMessage.bind(this);
    }
    // add handleChange() and submitMessage() methods here
  
    handleChange(event) {
      this.setState({
        input: event.target.value
      });
    }
  
    submitMessage() {
      const newMessages = [...this.state.messages, this.state.input]
      this.setState({
        input: '',
        messages: newMessages
      });
    }
  
    render() {
  
      console.log(this.state.messages);
      const items = this.state.messages.map(function(item) {
        return <li>{item}</li>;
      });
  
  
      return (
        <div>
          <h2>Type in a new Message:</h2>
          { /* render an input, button, and ul here */ }
          <input onChange={this.handleChange} value={this.state.input}></input>
          <button onClick={this.submitMessage}>Add message</button>
          <ul>
            {items}
          </ul>
          { /* change code above this line */ }
        </div>
      );
    }
};

//////////////////////////////////
// Connect React and Redux      //
//////////////////////////////////
// Redux Code:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};



const store = Redux.createStore(messageReducer);

// React Code:

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    const currentMessage = this.state.input;
    this.setState({
      input: '',
      messages: this.state.messages.concat(currentMessage)
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  // render the Provider here
  render() {
      return (
          <Provider store={store}>
            <DisplayMessages />
          </Provider>
      );
  }
  // change code above this line
};
