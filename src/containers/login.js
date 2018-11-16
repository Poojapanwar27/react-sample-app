import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {authorize} from '../actions';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = () => {
        const { username, password } = this.state;
        this.props.dispatch(authorize({username, password}));
    }

    componentDidUpdate() {
        let $elm = document.querySelector('.error-msg');
        if (this.props.error) {
            $elm.classList.remove('hide');
        }
        if (this.props.response) {
            return <Redirect to="/search" />;
        }
    }

    render() {
        const { error, token } = this.props;
        const { username, password} = this.state;
        
        if (token !== undefined && token !== '') {
            return <Redirect to="/search" />;
        }
        return(
            <div className="login-wrap container">
                <div className="error-msg alert alert-danger hide">
                    {error}
                </div>

                <h1>Sign in</h1>
                <p>You must log in to view the page.</p>
                
                <form action="" method="POST">
                    <fieldset className="form-group">
                        <label htmlFor="username" className="control-label">Username*</label>
                        <input id="username" name="username" className="form-control" type="text" placeholder="username" value={username} onChange={this.onChangeInput} required />
                    </fieldset>

                    <fieldset className="form-group">
                        <label htmlFor="password" className="control-label">Enter your password*</label>
                        <input type="password" name="password" className="form-control" value={password} onChange={this.onChangeInput} placeholder="*******" autoComplete="new-password" minLength = "8" required/>
                    </fieldset>

                    <fieldset className="form-group">
                        <button type="button" onClick={this.onSubmit} className="btn btn-default">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    response: state.authReducer.response,
    token: state.authReducer.token,
    error: state.authReducer.error
});

export default connect(mapStateToProps)(Login);