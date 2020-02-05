import React, { Component } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { MDBInput, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Student from "../services/Student";

export default class StudentRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleRegister = async () => {
        let payload = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            mobile: this.state.mobile,
            password: this.state.password
        }
        try {
            let data = await Student.register(payload);
        } catch (e) {
            alert(e);
        }
    }
    render() {
        console.log(this.state);
        return (
            <DefaultLayout>

                <div className="col-md-6 mb-4">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                    label="Firstname"
                                    name="firstname"
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
                                    label="Lastname"
                                    name="lastname"
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
                                    label="Email"
                                    name="email"
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
                                    label="Mobile"
                                    name="mobile"
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
                                    onClick={this.handleRegister}
                                    className="button submitbtn"
                                >
                                    Submit
                                </button>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>

                </div>
            </DefaultLayout>
        );
    }
}