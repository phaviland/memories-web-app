import React from 'react';
import {login} from '../actions/accountActions'
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({errors: {}})

        let hasError = false;
        if (this.state.username === '') {
            this.setState((prevState) => {
                return {errors: {...prevState.errors, usernameErrorMessage: 'Missing username'}};
            });
            hasError = true;
        }

        if (this.state.password === '') {
            this.setState((prevState) => {
                return {errors: {...prevState.errors, passwordErrorMessage: 'Missing password'}};
            });
            hasError = true;
        }

        if (!hasError) {
            let result = await this.props.login(this.state.username, this.state.password);
            if (result.status != 0) {
                this.setState((prevState) => {
                    return {errors: {...prevState.errors, loginErrorMessage: result.message}};
                });
            } else
                this.props.history.push('/account');
        }
        
    }

    render() {           
        let login =  (
            <>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={this.state.username} name="username" onChange={this.handleChange} />
                </label>
                {this.state.errors.usernameErrorMessage && <p>{this.state.errors.usernameErrorMessage}</p>} 
                <label>
                    Password:
                    <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
                </label>
                {this.state.errors.passwordErrorMessage && <p>{this.state.errors.passwordErrorMessage}</p>}
                <input type="submit" value="Submit" />
            </form>
            {this.state.errors.loginErrorMessage && <p>{this.state.errors.loginErrorMessage}</p>}
            </>
        );

        let redirect = (
            <Redirect to='/account' />
        )

        return (
            <>
                {this.props.loggedIn ? redirect : login}
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