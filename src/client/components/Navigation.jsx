import React from 'react';
import {withRouter} from "react-router";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <p>{this.props.location.pathname}</p>
        );
    }
}

export default withRouter(Navigation);