import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            accountErrorMessage: '',
            passwordErrorMessage: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        if (this.state.account === '')
            this.setState({accountErrorMessage: "Missing account"});
        if (this.state.password === '')
            this.setState({passwordErrorMessage: "Missing password"});
        event.preventDefault();
    }

    render() {
        let accountErrorMessage;
        if (this.state.accountErrorMessage)
            accountErrorMessage = <h1>{this.state.accountErrorMessage}</h1>;
        let passwordErrorMessage;
        if (this.state.passwordErrorMessage)
            passwordErrorMessage = <h1>{this.state.passwordErrorMessage}</h1>;

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Account:
                    <input type="text" value={this.state.account} name="account" onChange={this.handleChange} />
                </label>
                {accountErrorMessage}
                <label>
                    Password:
                    <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
                </label>
                {passwordErrorMessage}
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default Login;