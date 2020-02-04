import React from 'react';
import {setLoggedOut} from '../actions/accountActions'
import {connect} from "react-redux";

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        localStorage.clear();
        this.props.logout();
        this.props.history.push('/login');
    }

    render() {
        return (
            <>
                <p>
                    Welcome, your token is: {localStorage.getItem("Token")}
                </p>
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Logout" />
                </form>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(setLoggedOut())
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);