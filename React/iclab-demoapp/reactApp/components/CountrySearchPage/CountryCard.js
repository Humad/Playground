import React from 'react';


const countryCardStyle = {
    border: "2px solid grey",
    display: "flex",
    justifyContent: "space-between",
    height: "75px",
    width: "700px",
    alignItems: "center",
    padding: "15px",
    padding: "15px",
    marginBottom: "5px"
}

const countryFlagStyle = {
    maxWidth: "65px",
    maxHeight: "50px"
}

const countryNameStyle = {
    display: "inline-block"
}
  

class CountryCard extends React.Component {
    constructor(props) {
        super(props);
        this.flagUrl = "./images/flags/" + this.props.country.countryCode + ".png";
    }

    render() {
        console.log("Showing country card");
        return (
        <div style={countryCardStyle}>
            <div>
                <img style={countryFlagStyle} src={this.flagUrl}></img>
                <h2 style={countryNameStyle}>{this.props.country.name}</h2>
            </div>
        </div>
        );
    }
}

export default CountryCard;