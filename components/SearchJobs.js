import React, { Component } from "react";

import Card from "./Card";


export default class SearchJobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="search-result-bar">
                    <p>We found <span> 6 </span> results.</p>
                </div>
                <div className="row">
                    {
                        this.state.data.map((data, i) => {
                            return (
                                <div key={i} className="col-md-12">
                                    <Card data={data} />
                                </div>
                            )
                        })
                    }
                </div>
            </React.Fragment>
        );
    }
}