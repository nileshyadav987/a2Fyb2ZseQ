import React, { Component } from "react";
import Link from "next/link";
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };
    }
    componentDidMount() {
        if (localStorage.getItem("std_token")) {
            this.setState({ token: localStorage.getItem("std_token") });
        }
    }
    render() {
        return (
            <nav className="navbar navbar-light static-top">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img width='145px' src={require('../public/static/images/KF_Text-icon.png')} />
                    </a>
                    {
                        this.state.token ? (
                            <Link href="/profile" replace>
                                <a className="btn btn-primary">Profile</a>
                            </Link>
                        ) : (
                                <Link href="/student-login" replace>
                                    <a className="btn btn-primary">Login</a>
                                </Link>
                            )
                    }
                </div>
            </nav>
        );
    }
}