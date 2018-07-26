import React from 'react';
import CountryDetails from './CountryDetails';
import ExperimentResults from './ExperimentResults';
import axios from 'axios';

const apiUrl = "/api";

class CountryDetailsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            experiments: [],
            countryCode: "",
            countryName: ""
        }
    }

    componentDidMount() {
        axios.get(apiUrl + '/getCountry?countryCode=' + this.props.match.params.countryCode)
        .then((response) => {
            this.setState({
                experiments: response.data,
                countryCode: response.data.length > 0 ? response.data[0].countryCode : "",
                countryName: response.data.length > 0 ? response.data[0].countryName : ""
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <CountryDetails countryCode={this.state.countryCode} countryName={this.state.countryName} experimentCount={this.state.experiments.length} />
                <ExperimentResults experiments={this.state.experiments}/>
            </div>
        );
    }
}

export default CountryDetailsContainer;