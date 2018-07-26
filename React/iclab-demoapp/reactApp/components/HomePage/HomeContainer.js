import React from 'react';
import LandingContainer from './LandingContainer';
import BasicMap from './BasicMap';
import axios from 'axios';

const apiUrl = "/api";

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCountries: []
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
                allCountries: allCountries
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <LandingContainer />
                <BasicMap countries={this.state.allCountries} />
            </div>
      );
    }
}

export default HomeContainer;