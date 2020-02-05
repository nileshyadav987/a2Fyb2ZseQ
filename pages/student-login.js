import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { MDBInput, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Student from "../services/Student";
import Router from "next/router";
import Link from "next/link";

export default class StudentLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleLogin = async () => {
        let payload = {
            user: this.state.user,
            password: this.state.password
        }
        try {
            let data = await Student.login(payload);
            localStorage.setItem("std_token", data.token);
            Router.push("/");
        } catch (e) {
            alert(e);
        }
    }
    render() {
        return (
            <DefaultLayout>

                <div className="col-md-6 mb-4">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                    label="Email / Mobile No."
                                    name="user"
                                    outline
                                    onChange={(e) => this.handleChange(e)}
                                >
                                    <div className="invalid-feedback">

                                    </div>
                                </MDBInput>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                    label="Password"
                                    name="password"
                                    outline
                                    onChange={(e) => this.handleChange(e)}
                                >
                                    <div className="invalid-feedback">

                                    </div>
                                </MDBInput>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <button
                                    type="button"
                                    onClick={this.handleLogin}
                                    className="button submitbtn"
                                >
                                    Submit
                                </button>
                                <Link href="/student-register">
                                    <a>Register here</a>
                                </Link>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>

                </div>
            </DefaultLayout>
        );
    }
}