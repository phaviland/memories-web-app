import React from 'react';
import {login} from '../actions/accountActions'
import {connect} from "react-redux";

class Account extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <p>
                    Welcome, your token is: {localStorage.getItem("Token")}
                </p>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);