import React, { Component, useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import Student from "../../services/Student";
import Keyword from "../../services/Keyword";
import ReactTags from 'react-tag-autocomplete';
import moment from 'moment';
import Router, { useRouter } from "next/router";

export default function StudentProfile() {
    const router = useRouter();

    const [state, setState] = useState({
        data: {},
    });
    useEffect(() => {
        async function fetchData() {
            try {
                let res = await Student.publicprofile({ id: router.query.id });
                setState(prevState => ({
                    ...prevState,
                    data: res.data
                }));
            } catch (e) {
                console.log(e.toString());
            }
        }
        fetchData();
    }, []);

    return (
        <DefaultLayout>
            <div className="col-md-12">
                <div className="profile-box">
                    <div className="profile-box-header">
                        <h3>Personal</h3>
                    </div>
                    <div className="profile-box-text">
                        <p>{state.data.firstname}</p>
                        <p>{state.data.lastname}</p>
                        <p>{state.data.email}</p>
                        <p>{state.data.mobile}</p>
                    </div>
                </div>

                <div className="profile-box">
                    <div className="profile-box-header">
                        <h3>About</h3>
                    </div>
                    <div className="profile-box-text">
                        {('about' in state.data) ? state.data.about : ''}
                    </div>
                </div>

                <div className="profile-box">
                    <div className="profile-box-header">
                        <h3>Education details</h3>
                    </div>
                    <div className="profile-box-text">
                        {('educationDetails' in state.data) ? (
                            state.data.educationDetails.map((ed, i) => {
                                return <div key={i}>
                                    <p>{ed.degree}</p>
                                    <p>{ed.year}</p>
                                    <p>{ed.college}</p>
                                    <p>{ed.percentage}</p>
                                </div>
                            })
                        ) : ''}
                    </div>
                </div>

                <div className="profile-box">
                    <div className="profile-box-header">
                        <h3>Skills</h3>
                    </div>
                    <div className="profile-box-text">
                        {('skills' in state.data) ? state.data.skills.join(', ') : ''}
                    </div>
                </div>

                <div className="profile-box">
                    <div className="profile-box-header">
                        <h3>Training &amp; Cetification</h3>
                    </div>
                    <div className="profile-box-text">
                        {('trainingDetails' in state.data) ? (
                            state.data.trainingDetails.map((td, i) => {
                                return <div key={i}>
                                    <p>{td.title} from {td.instituteName} duration {moment(td.from).format('MMM, YYYY')}&nbsp;to&nbsp;{moment(td.to).format('MMM, YYYY')}</p>
                                </div>
                            })
                        ) : ''}
                    </div>
                </div>

                <div className="profile-box">
                    <div className="profile-box-header">
                        <h3>Projects</h3>
                    </div>
                    <div className="profile-box-text">
                        {('projectDetails' in state.data) ? (
                            state.data.projectDetails.map((pd, i) => {
                                return <div key={i}>
                                    <p><strong>{pd.title}</strong></p>
                                    <p>{pd.content}</p>
                                </div>
                            })
                        ) : ''}
                    </div>
                </div>
            </div>
        </DefaultLayout >
    );

}