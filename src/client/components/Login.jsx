import React from 'react';
import {login} from '../actions/accountActions'
import {connect} from "react-redux";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameErrorMessage: '',
            passwordErrorMessage: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        let hasError = false;

        if (this.state.username === '') {
            this.setState({usernameErrorMessage: 'Missing username'});
            hasError = true;
        }
        else
            this.setState({usernameErrorMessage: ''});

        if (this.state.password === '') {
            this.setState({passwordErrorMessage: "Missing password"});
            hasError = true;
        }
        else
            this.setState({passwordErrorMessage: ""});

        this.props.login(this.state.username, this.state.password);
        event.preventDefault();
    }

    componentDidUpdate(prevProps) {
        if(this.props.loggedIn != prevProps.loggedIn)
            if(this.props.loggedIn)
                this.props.history.push('/account');
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={this.state.username} name="username" onChange={this.handleChange} />
                    </label>
                    {this.state.usernameErrorMessage && <p>{this.state.usernameErrorMessage}</p>} 
                    <label>
                        Password:
                        <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
                    </label>
                    {this.state.passwordErrorMessage && <p>{this.state.passwordErrorMessage}</p>}
                    <input type="submit" value="Submit" />
                </form>
                {this.props.loggedInError && <p>{this.props.loggedInError}</p>}
            </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(login(username, password))
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.account.loggedIn,
        loggedInError: state.account.loggedInError
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);