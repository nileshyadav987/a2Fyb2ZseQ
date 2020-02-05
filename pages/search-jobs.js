import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import SearchJobs from "../components/SearchJobs";
import SearchFilters from "../components/SearchFilters";
import Jobs from "../services/jobs";
import Router, { useRouter } from "next/router";

export default function SearchJobsPage() {
    const router = useRouter();
    const [data, setData] = useState(0);
    const [urlQuery, setUrlQuery] = useState(0);
    const [token, setToken] = useState(0);

    useEffect(() => {
        setToken(localStorage.getItem("std_token"));
    }, []);

    const refreshData = () => {
        Jobs.search(router.query, { 'x-access-token': token }).then(function (res) {
            setData(res.data);
        }).catch(function (e) {
            console.log('Error FeaturedJobs:' + e);
        });
    }

    const applySkills = (skills) => {
        let query = router.query;
        query.skills = skills.join(',');
        let newQuery = [];
        Object.keys(query).map((q, i) => {
            newQuery[i] = `${q}=${query[q]}`;
        });
        console.log(78);
        Router.push(
            `/search-jobs?${newQuery.join('&')}`
        );
    }
    if (token && urlQuery !== router.query) {
        refreshData();
        setUrlQuery(router.query);
    }
    return (
        <DefaultLayout>
            <div className="col-md-4">
                <SearchFilters applySkills={applySkills} />
            </div>
            <div className="col-md-8">
                {
                    token && data.length ? (<SearchJobs data={data} />) : <p>No results found</p>
                }
            </div>
        </DefaultLayout>
    );
}