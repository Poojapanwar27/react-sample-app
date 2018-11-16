import React,  {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    logout = (e) => {
        e.preventDefault();
        this.props.dispatch(logout());
    }

    toggleClass = (e) => {
        this.classList.toggleClass('is-active');
    }

    handleToggle = (e) => {
        this.setState({ show: !this.state.show });       
    }

    render() {
        const userDetails = this.props.response ? (<span className="username">
            Hi, {this.props.response.name}
        </span>): (<span></span>);

        const navButtons = this.props.token ? (
            <li>
                {userDetails}
                <a href='#' className='btn btn--login btn--nav' onClick={this.logout}>
                    Logout
                </a>
            </li>
            ) : (
            <li>
                <NavLink to="/" activeClassName='is-active' onClick={this.toggleClass}>
                    Sign in
                </NavLink>
            </li>
        )

        return (
            <header className="app-header">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a href="/" className="navbar-brand">
                                Star Wars
                            </a>
                        </div>
                        <ul className="nav navbar-nav pull-right">
                            {navButtons}
                            <li>
                                <NavLink to="/search" activeClassName='is-active' onClick={this.toggleClass}>
                                    Search
                                </NavLink>
                            </li>                  
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    token: state.authReducer.token,
    response: state.authReducer.response
});

export default connect(mapStateToProps)(Header);