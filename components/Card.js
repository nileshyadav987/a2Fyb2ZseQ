import React, { Component } from "react";
import jobs from "../services/jobs";

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            applied: (this.props.data.Applied == undefined) ? false : true
        };
    }
    handleApplyButton = async () => {
        let data = await jobs.applyJob({ id: this.state.data._id }, { 'x-access-token': localStorage.getItem("std_token") });
        this.setState({ applied: true });
    }
    render() {
        return (
            <div className="single-job-post">
                <div className="img-icon"><img src="http://preview.hasthemes.com/jobhere-v1/images/company-logo/1.png" alt="" /></div>
                <div className="address">
                    <h6>{this.state.data.title}</h6>
                    <p>{this.state.data.company}</p>
                    <p>Skills: {this.state.data.skills.join(", ")}</p>
                    <p>Location : Dhaka</p>
                </div>
                {
                    this.state.applied ? (
                        <div className="button-box">
                            <a className="button button-black">Applied</a>
                        </div>
                    ) : (
                            <div className="button-box" onClick={this.handleApplyButton}>
                                <a className="button button-black">Apply now</a>
                            </div>
                        )
                }

            </div>
        );
    }
}