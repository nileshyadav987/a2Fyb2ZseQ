import React, { Component } from "react";
import Jobs from "../services/jobs";
import Card from "./Card";
import ReactTags from 'react-tag-autocomplete';
import Keyword from "../services/Keyword";
import Router, { useRouter } from "next/router";

export default class FeaturedJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tags: [],
            suggestions: []
        };
    }


    handleDelete(i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags }, function () {
            this.refreshFilters();
        })
    }

    handleAddition(tag) {
        const tags = [].concat(this.state.tags, tag);
        this.setState({
            tags
        }, function () {
            this.refreshFilters();
        });

    }
    refreshFilters() {
        let urlTags = this.state.tags.map(function (tag, i) {
            return tag.name;
        });
        this.props.applySkills(urlTags);
    }
    async handleInputChange(query) {
        let res = await Keyword.search({ query });
        let includeQuery = true;
        let data = res.data.map(function (d, i) {
            if (query == d.title) includeQuery = false;
            return { id: d.title, name: d.title }
        });
        if (includeQuery == true) data.push({ id: query, name: query });
        this.setState({
            suggestions: data
        });
    }
    render() {
        return (
            <div>
                <div className="mb-6">
                    <h5 className="mb-4 font-weight-normal">Filter by Skills</h5>
                    <ReactTags
                        tags={this.state.tags}
                        suggestions={this.state.suggestions}
                        handleDelete={this.handleDelete.bind(this)}
                        handleAddition={this.handleAddition.bind(this)}
                        autoresize={false}
                        handleInputChange={(e) => this.handleInputChange(e)}
                    />
                </div>
            </div >
        );
    }
}