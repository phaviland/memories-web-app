import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Login from './Login.jsx';
import {setUsername} from '../actions/accountActions';
import {fetchMemoryWithId} from '../actions/memoryActions'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setUsername("Peter");
        this.props.fetchMemoryWithId("123");
    }

    render() {
        return(
        <div>
            {this.props.isFetching ? <div> WE ARE LOADING </div>
            :
            <Router>
                <Switch>
                    <Route path='/login' component={Login} />
                </Switch>
            </Router>}
        </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUsername: (username) => dispatch(setUsername(username)),
        fetchMemoryWithId: (memoryId) => dispatch(fetchMemoryWithId(memoryId))
    }
}

const mapStateToProps = state => {
    return {
        username: state.account.username,
        isFetching: state.memory.isFetching
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);