import React from 'react';


const countryContainerStyle = {

}

const countryFlagStyle = {
    maxWidth: "65px",
    maxHeight: "50px"
}

const countryStyle = {
    display: "inline-block"
}

class CountryDetails extends React.Component {
    constructor(props) {
        super(props);
        console.log("./images/flags/" + this.props.countryCode + ".png");
    }

    render() {
        console.log("./images/flags/" + this.props.countryCode + ".png");
        return (
            <div style={countryContainerStyle}>
                <img style={countryFlagStyle} src={"./images/flags/" + this.props.countryCode + ".png"}></img>
                <h1 style={countryStyle}>{this.props.countryName}</h1>

                <h4>Total experiments: {this.props.experimentCount}</h4>
            </div>
        );
    }
}

export default CountryDetails;