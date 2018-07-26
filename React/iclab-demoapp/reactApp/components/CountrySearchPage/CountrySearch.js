import React from 'react';

const searchStyle = {
    display: "flex",
    justifyContent: "center",
    margin: "15px"
}

const searchInputStyle = {
    width: "50%"
}

class CountrySearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            typedText: ""
        }

        this.userTypedText = this.userTypedText.bind(this);
    }

    userTypedText(event) {
        this.props.searchDidUpdate(event.target.value);
        this.setState({
            typedText: event.target.value
        });
    }

    render() {
        console.log("Showing country search bar");
        return (
            <div>
            <h3>Search for countries to view individual experiment results</h3>
            <div style={searchStyle}>
                <input style={searchInputStyle} className="form-control" type="text" value={this.state.typedText} onChange={this.userTypedText} placeholder="Search"></input>
            </div>
            </div>
        );
    }
}

export default CountrySearch;