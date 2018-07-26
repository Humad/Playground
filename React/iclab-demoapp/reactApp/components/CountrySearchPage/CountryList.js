import React from 'react';
import CountryCard from './CountryCard';
import { Link } from 'react-router-dom';

const countryListStyle = {
    display: "flex",
    justifyContent: "center"
}

class CountryList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("Showing country list");
        return (
            <div style={countryListStyle}>
                <div>
                {this.props.countriesToShow.map((item) => {return <Link key={item.name} to={`/${item.countryCode}`}><CountryCard country={item}></CountryCard></Link>})}
                </div>
            </div>
        );
    }
}

export default CountryList;