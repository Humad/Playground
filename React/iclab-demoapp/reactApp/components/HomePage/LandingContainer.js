import React from 'react';

class JumbotronContainer extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="jumbotron jumbotron-center">
                <h1 className="display-4">ICLab Demo</h1>
                <p className="lead">This is a demo web application for the Information Controls Lab at UMass Amherst</p>
                <hr className="my-4"/>
                <p>The following tools were used in the development of this application:</p>
                <span><img src="./images/js_logo.png" className="logo-image"></img></span>
                <span><img src="./images/node_logo.png" className="logo-image"></img></span>
                <span><img src="./images/react_logo.png" className="logo-image"></img></span>
                <br></br>
                <a className="btn btn-block btn-social btn-github" target="#" href="https://github.com/Humad/iclab-demoapp">
                    <span className="fa fa-github"></span> See the code!
                </a>
            </div>
        )
    }
}

export default JumbotronContainer;