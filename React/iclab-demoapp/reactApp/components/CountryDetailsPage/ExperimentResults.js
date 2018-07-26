import React from 'react';

const experimentCardStyle = {
    border: "2px solid grey",
    width: "500px",
    padding: "15px",
    padding: "15px",
    marginBottom: "5px"
}

class ExperimentResults extends React.Component {
    constructor(props) {
        super(props);
        //style={experimentResultsStyle}
    }

    render() {
        return <div>
            <h3>Experiment Results</h3>
            {this.props.experiments.map((item) => <div key={item.ip_address} style={experimentCardStyle}>
                Time taken for experiment: {item.time_taken} <br></br>
                Server time: {item.server_time} <br></br>
                IP Address: {item.ip_address} <br></br>
                Schedule: {item.schedule}
            </div>)}
        </div>
    }
}

export default ExperimentResults;