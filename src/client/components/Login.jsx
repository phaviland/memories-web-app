import React from 'react';
import {login} from '../actions/accountActions'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import '../stylesheets/login.scss'

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
            <div className='login-form'>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type='text' value={this.state.username} name='username' placeholder='Username' onChange={this.handleChange} />
                        <br />
                    </label>
                    {this.state.errors.usernameErrorMessage && <p>{this.state.errors.usernameErrorMessage}</p>} 
                    <label>
                        <input type='password' value={this.state.password} name='password' placeholder='Password' onChange={this.handleChange} />
                    </label>
                    {this.state.errors.passwordErrorMessage && <p>{this.state.errors.passwordErrorMessage}</p>}
                    <br />
                    <input type='submit' value='Submit' />
                </form>
                {this.state.errors.loginErrorMessage && <p>{this.state.errors.loginErrorMessage}</p>}
            </div>
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