class FizzBuzz extends React.Component {
    constructor(props) {
      super(props);
      this.createList = this.createList.bind(this);
    }
    
    createList() {
      let list = [];
      for (var i = 0; i < this.props.n; i++) {
        let style = {color: "black"};
        if (i % 6 == 0) {
          style.color = "purple";
        } else if (i % 2 == 0) {
          style.color = "blue";
        } else if (i % 3 == 0) {
          style.color = "red";
        }
        list.push(<li key={i} style={style}>{i}</li>)
      }
      return list;
    }
    
    render() {
      // YOUR CODE HERE
      return <div>
        <ul>
          {this.createList()}
        </ul>
      </div>
    } 
      
}
  
  
ReactDOM.render(<FizzBuzz n={20}/>, document.getElementById('out'));