import React, { useState, useEffect } from "react";
import HomeLayout from "../components/HomeLayout";
import FeaturedJobs from "../components/Home/FeaturedJobs";
import SingleSearch from "../components/Home/SingleSearch";
export default function HomePage() {
    return (
        <HomeLayout>
            <SingleSearch />
            <FeaturedJobs />
        </HomeLayout>
    );
}