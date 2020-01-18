import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Login from './Login.jsx';
import Account from './Account.jsx';
import {retrieveSessionFromCookie} from '../actions/accountActions';
import {fetchMemoryWithId} from '../actions/memoryActions'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //this.props.fetchMemoryWithId("123");
        if (!this.props.loggedIn)
            this.props.retrieveSessionFromCookie()
    }

    render() {
        return(
        <>
            <Router>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/account' component={Account} />
                </Switch>
            </Router>
        </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //fetchMemoryWithId: (memoryId) => dispatch(fetchMemoryWithId(memoryId)),
        retrieveSessionFromCookie: () => dispatch(retrieveSessionFromCookie())
    }
}

const mapStateToProps = state => {
    return {
        //isFetching: state.memory.isFetching,
        loggedIn: state.account.loggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);