import React from 'react';
import CountrySearch from './CountrySearch';
import CountryList from './CountryList';
import axios from 'axios';

const apiUrl = "/api";

const CountrySearchContainerStyle = {
    textAlign: "center"
}

class CountrySearchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allCountries: [],
            countriesToShow: []
        }
    }

    componentDidMount() {
        axios.get(apiUrl + '/getCountries')
        .then((response) => {
            var allCountries = [];
            for (var key in response.data) {
                allCountries.push(response.data[key]);
            }
            this.setState({
                allCountries: allCountries,
                countriesToShow: allCountries
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    searchDidUpdate(searchString) {
        searchString = searchString.toLowerCase();

        var newCountriesToShow = this.state.allCountries.filter(function(item) {
            return item.name.toLowerCase().search(searchString) != -1;
        });

        this.setState({
            countriesToShow: newCountriesToShow
        });
    }

    render() {
        console.log("Showing country search container");
        return (
            <div style={CountrySearchContainerStyle}>
                <CountrySearch searchDidUpdate={(searchString) => this.searchDidUpdate(searchString)} />
                <CountryList countriesToShow={this.state.countriesToShow} />
            </div>
        );
    }
}

export default CountrySearchContainer;