import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomeContainer from './HomePage/HomeContainer';
import CountrySearchContainer from "./CountrySearchPage/CountrySearchContainer";
import CountryDetailsContainer from './CountryDetailsPage/CountryDetailsContainer';

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-dark bg-primary">
                        <Link to="/" className="navbar-brand">ICLab Demo</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                            <Link to="/" className="active" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/countries" className="nav-link">Country List</Link>
                            </li>
                        </ul>
                        </div>
                    </nav>

                    <hr />

                    <Route exact path="/" component={HomeContainer} />
                    
                        <Route exact path="/countries" component={CountrySearchContainer} />
                        <Route path="/:countryCode" component={CountryDetailsContainer} />
                    
                    
                </div>
            </Router>
        );
    }
}

export default MainComponent;