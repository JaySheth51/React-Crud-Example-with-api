import React, { Component } from "react";
import { loginAuth } from './services/login';
import { Redirect } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            auth: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loginCallback = this.loginCallback.bind(this);
    }
    handleEmailChange(event) {
        event.preventDefault();

        this.setState({
            email: event.target.value
        })

    }
    handlePasswordChange(event) {
        event.preventDefault();

        this.setState({
            password: event.target.value
        })

    }
    loginCallback(value) {
        if (value.code === 200) {
            this.setState({
                auth: true
            })
        }
        else {
            this.setState({
                auth: false
            })
            alert("Login failed");
        }

    }
    handleSubmit(event) {
        event.preventDefault();
        loginAuth(this.state, this.loginCallback)
    }

    render() {

        if (this.state.auth) {
            return (<Redirect to={{
                pathname: "/home",
                state: { auth: this.state.auth }
            }}
            />
            )
        }

        return (
            <div className="col-sm-5 login-form container text-center">
                <div className="wrapper">
                    <div className="title">
                        <form action="index.html" method="post" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email Address"
                                    onChange={this.handleEmailChange}
                                    className="form-control border-bottom-0 active" />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="form-control"
                                    onChange={this.handlePasswordChange} />
                            </div>
                            <div className="form-group">
                                <a href="reset.html">Forgot Password?</a>
                            </div>
                            <div className="from-group">
                                <input type="submit" value="Login" className="btn btn-default" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}