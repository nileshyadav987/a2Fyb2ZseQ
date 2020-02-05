import React, { Component } from "react";
import Jobs from "../../services/jobs";
import Card from "../Card";
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
    render() {
        return (
            <section className="featured-jobs">
                <div className="container">
                    <h2 className="mb-5 text-center">Featured jobs in your area</h2>
                    <div className="row">
                        {
                            this.state.data.map((data, i) => {
                                return (
                                    <div key={i} className="col-md-6">
                                        <Card data={data} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section >
        );
    }
}