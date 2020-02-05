import React, { Component } from "react";
import Jobs from "../../services/jobs";
import Router from "next/router";

import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
export default class FeaturedJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            vr: 999
        };
    }
    async componentDidMount() {
        try {
            let res = await Jobs.homeJobs({}, { 'x-access-token': localStorage.getItem("std_token") });
            this.setState({ data: res.data });
        } catch (e) {
            console.log('Error FeaturedJobs:' + e);
        }
    }
    onKeyPressed(e) {
        if (e.key == 'Enter') {
            console.log(e.target.value);
            Router.push(
                `/search-jobs?text=${e.target.value}`
            );
        }
    }
    render() {
        return (
            <section className="featured-jobs">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol sm="12">
                            <MDBInput
                                label="Type and hit Enter button"
                                name="text"
                                outline
                                onKeyDown={(e) => this.onKeyPressed(e)}
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section >
        );
    }
}