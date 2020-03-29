import React from 'react';
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {CSSTransition, transit} from 'react-css-transition';
import '../stylesheets/navigation.scss'

class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div>
                    <div className='nav-url'>
                        <Link to='/login'>Login</Link>
                    </div>
                    <div className='nav-url'>
                        <Link to='/account'>My Account</Link>
                    </div>
                </div>
                <div>
                    <div className='underline-container'>
                        {this.props.location.pathname == '/login' && <div className='active-url'></div>}
                    </div>
                    <div className='underline-container'>
                        {this.props.location.pathname == '/account' && <div className='active-url'></div>}
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Navigation);