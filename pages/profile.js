import React, { Component } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import Student from "../services/Student";
import Keyword from "../services/Keyword";
import ReactTags from 'react-tag-autocomplete';
import moment from 'moment';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutModel: false,
            addEduModal: false,
            toggleSkillsModal: false,
            trainingModal: false,
            projectModal: false,
            data: {},
            addEducation: {},
            addTraining: {},
            addProject: {},
            tags: [],
            suggestions: []
        }
    };
    componentDidMount = async () => {
        let res = await Student.myprofile({}, { 'x-access-token': localStorage.getItem("std_token") });
        let tags = res.data.skills.map(function (d, i) {
            return { id: d, name: d }
        });
        this.setState({ data: res.data, about: res.data.about, tags: tags });
    }
    toggleAboutModal = () => {
        this.setState({
            aboutModel: !this.state.aboutModel
        });
    }
    toggleAddEduModal = () => {
        this.setState({
            addEduModal: !this.state.addEduModal
        });
    }
    toggleSkillsModal = () => {
        this.setState({
            toggleSkillsModal: !this.state.toggleSkillsModal
        });
    }
    toggleTrainingModal = () => {
        this.setState({
            trainingModal: !this.state.trainingModal
        });
    }
    toggleProjectModal = () => {
        this.setState({
            projectModal: !this.state.projectModal
        });
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleEduChange = (e) => {
        this.setState({ addEducation: { ...this.state.addEducation, [e.target.name]: e.target.value } });
    }
    handleTrainingChange = (e) => {
        this.setState({ addTraining: { ...this.state.addTraining, [e.target.name]: e.target.value } });
    }
    handleProjectChange = (e) => {
        this.setState({ addProject: { ...this.state.addProject, [e.target.name]: e.target.value } });
    }
    saveAboutSection = async () => {
        try {
            this.setState({ data: { ...this.state.data, about: this.state.about } });
            await Student.updateprofile({ about: this.state.about }, { 'x-access-token': localStorage.getItem("std_token") });
            this.toggleAboutModal();
        } catch (e) {
            alert(e);
        }
    }
    saveTrainingSection = async () => {
        try {
            let trainingObj = {
                title: this.state.addTraining.trainingTitle,
                instituteName: this.state.addTraining.instituteName,
                from: moment(`01/${this.state.addTraining.trainingFromMonth}/${this.state.addTraining.trainingFromYear}`, 'DD/MM/YYYY').toDate(),
                to: moment(`01/${this.state.addTraining.trainingToMonth}/${this.state.addTraining.trainingToYear}`, 'DD/MM/YYYY').toDate()
            };
            let res = await Student.updateprofile({ trainingObj: trainingObj }, { 'x-access-token': localStorage.getItem("std_token") });
            this.setState({ addTraining: {}, data: res.data });
            this.toggleTrainingModal();
        } catch (e) {
            alert(e);
        }
    }
    saveProjectSection = async () => {
        try {
            let projectObj = {
                title: this.state.addProject.projectTitle,
                content: this.state.addProject.projectContent
            };
            let res = await Student.updateprofile({ projectObj: projectObj }, { 'x-access-token': localStorage.getItem("std_token") });
            this.setState({ data: res.data });
            this.setState({ addProject: {} });
            this.toggleProjectModal();
        } catch (e) {
            alert(e);
        }
    }
    saveEduSection = async () => {
        try {
            await Student.updateprofile(this.state.addEducation, { 'x-access-token': localStorage.getItem("std_token") });
        } catch (e) {
            alert(e);
        }
    }
    saveSkillsSection = async () => {
        try {
            let payload = this.state.tags.map(function (d, i) {
                return d.name;
            });
            await Student.updateprofile({ skills: payload.join(',') }, { 'x-access-token': localStorage.getItem("std_token") });
        } catch (e) {
            alert(e);
        }
    }
    removeEducation = async (e, ed) => {
        if (confirm('Are you sure, want to delete?')) {
            try {
                let mainData = JSON.parse(JSON.stringify(this.state.data.educationDetails));
                let deleteIndex = mainData.findIndex(x => x._id == ed._id);
                if (deleteIndex > -1) {
                    mainData.splice(deleteIndex, 1);
                }
                this.setState({ data: { ...this.state.data, educationDetails: mainData } });
                await Student.updateprofile({ removeEducation: ed._id }, { 'x-access-token': localStorage.getItem("std_token") });
            } catch (e) {
                alert(e);
            }

        }
    }
    removeTraining = async (e, td) => {
        if (confirm('Are you sure, want to delete?')) {
            try {
                let mainData = JSON.parse(JSON.stringify(this.state.data.trainingDetails));
                let deleteIndex = mainData.findIndex(x => x._id == td._id);
                if (deleteIndex > -1) {
                    mainData.splice(deleteIndex, 1);
                }
                this.setState({ data: { ...this.state.data, trainingDetails: mainData } });
                await Student.updateprofile({ removeTraining: td._id }, { 'x-access-token': localStorage.getItem("std_token") });
            } catch (e) {
                alert(e);
            }

        }
    }

    handleDelete(i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
    }

    handleAddition(tag) {
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags })
    }

    async handleInputChange(query) {
        let res = await Keyword.search({ query });
        let includeQuery = true;
        let data = res.data.map(function (d, i) {
            if (query == d.title) includeQuery = false;
            return { id: d.title, name: d.title }
        });
        if (includeQuery == true) data.push({ id: query, name: query });
        this.setState({ suggestions: data });
    }
    render() {
        console.log(this.state);
        return (
            <DefaultLayout>
                <div className="col-md-12">
                    <div className="profile-box">
                        <div className="profile-box-header">
                            <h3>About</h3>
                        </div>
                        <div className="profile-box-text">
                            {
                                this.state.data && this.state.data.about ? (
                                    this.state.data.about
                                ) : (
                                        <p>Write something about you.</p>
                                    )
                            }
                        </div>
                    </div>
                    <p><MDBBtn onClick={this.toggleAboutModal}>Change</MDBBtn></p>
                    <MDBModal isOpen={this.state.aboutModel} toggle={this.toggleAboutModal}>
                        <MDBModalHeader toggle={this.toggleAboutModal}>Write something about you</MDBModalHeader>
                        <MDBModalBody>
                            <div><textarea
                                className="form-control"
                                rows="3"
                                name="about"
                                onChange={(e) => this.handleChange(e)}
                                value={this.state.about}
                            /></div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="primary" onClick={this.saveAboutSection}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                    <div className="profile-box">
                        <div className="profile-box-header">
                            <h3>Education details</h3>
                        </div>
                        <div className="profile-box-text">
                            {
                                this.state.data.educationDetails != undefined ?
                                    this.state.data.educationDetails.map((ed, i) => {
                                        return <div key={i}>
                                            <p>{ed.degree}</p>
                                            <p>{ed.year}</p>
                                            <p>{ed.college}</p>
                                            <p>{ed.percentage}</p>
                                            <MDBBtn onClick={(e) => this.removeEducation(e, ed)}>X</MDBBtn>
                                        </div>
                                    })
                                    :
                                    <p>Add your education details</p>
                            }

                        </div>
                    </div>
                    <p><MDBBtn onClick={this.toggleAddEduModal}>Add Education</MDBBtn></p>
                    <MDBModal isOpen={this.state.addEduModal} toggle={this.toggleAddEduModal}>
                        <MDBModalHeader toggle={this.toggleAddEduModal}>Add Education</MDBModalHeader>
                        <MDBModalBody>
                            <MDBContainer>
                                <MDBRow>
                                    <MDBCol sm="6">
                                        <MDBInput
                                            label="Degree"
                                            name="degree"
                                            outline
                                            onChange={(e) => this.handleEduChange(e)}
                                        />
                                    </MDBCol>
                                    <MDBCol sm="6">
                                        <MDBInput
                                            label="Year"
                                            name="year"
                                            outline
                                            onChange={(e) => this.handleEduChange(e)}
                                        />
                                    </MDBCol>
                                    <MDBCol sm="6">
                                        <MDBInput
                                            label="School/College/University"
                                            name="college"
                                            outline
                                            onChange={(e) => this.handleEduChange(e)}
                                        />
                                    </MDBCol>
                                    <MDBCol sm="6">
                                        <MDBInput
                                            label="Percentage"
                                            name="percentage"
                                            outline
                                            onChange={(e) => this.handleEduChange(e)}
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="primary" onClick={this.saveEduSection}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                    <div className="profile-box">
                        <div className="profile-box-header">
                            <h3>Skills</h3>
                        </div>
                        <p>{this.state.data && this.state.data.skills ? this.state.data.skills.join(', ') : ''}</p>
                    </div>
                    <p><MDBBtn onClick={this.toggleSkillsModal}>Change Skills</MDBBtn></p>
                    <MDBModal isOpen={this.state.toggleSkillsModal} toggle={this.toggleSkillsModal}>
                        <MDBModalHeader toggle={this.toggleSkillsModal}>Manage Skills</MDBModalHeader>
                        <MDBModalBody>
                            <MDBContainer>
                                <MDBRow>
                                    <MDBCol sm="12">
                                        <ReactTags
                                            tags={this.state.tags}
                                            suggestions={this.state.suggestions}
                                            handleDelete={this.handleDelete.bind(this)}
                                            handleAddition={this.handleAddition.bind(this)}
                                            autoresize={false}
                                            handleInputChange={(e) => this.handleInputChange(e)}
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="primary" onClick={this.saveSkillsSection}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                    <div className="profile-box">
                        <div className="profile-box-header">
                            <h3>Training &amp; Cetification</h3>
                        </div>
                        {
                            this.state.data.trainingDetails != undefined ?
                                this.state.data.trainingDetails.map((td, i) => {
                                    return <div key={i}>
                                        <p>{td.title} from {td.instituteName} duration {moment(td.from).format('MMM, YYYY')}&nbsp;to&nbsp;{moment(td.to).format('MMM, YYYY')}</p>
                                        <MDBBtn onClick={(e) => this.removeEducation(e, td)}>X</MDBBtn>
                                    </div>
                                })
                                :
                                <p>Add your Training/ Certification experiance.</p>
                        }
                    </div>
                    <p><MDBBtn onClick={this.toggleTrainingModal}>Add Certification</MDBBtn></p>
                    <MDBModal isOpen={this.state.trainingModal} toggle={this.toggleTrainingModal}>
                        <MDBModalHeader toggle={this.toggleTrainingModal}>Edit Training and Certification</MDBModalHeader>
                        <MDBModalBody>
                            <MDBContainer>
                                <MDBRow>
                                    <MDBCol sm="12">
                                        <MDBInput
                                            label="Certication name/ Training program"
                                            name="trainingTitle"
                                            outline
                                            onChange={(e) => this.handleTrainingChange(e)}
                                        />
                                    </MDBCol>
                                    <MDBCol sm="12">
                                        <MDBInput
                                            label="Institute name"
                                            name="instituteName"
                                            outline
                                            onChange={(e) => this.handleTrainingChange(e)}
                                        />
                                    </MDBCol>
                                    <MDBCol sm="6">
                                        <p>From</p>
                                        <select name="trainingFromMonth" onChange={(e) => this.handleTrainingChange(e)}>
                                            <option>Month</option>
                                            <option value="1">Jan-1</option>
                                            <option value="2">Feb-2</option>
                                            <option value="3">March-3</option>
                                            <option value="4">April-4</option>
                                            <option value="5">May-5</option>
                                            <option value="6">June-6</option>
                                            <option value="7">July-7</option>
                                            <option value="8">Aug-8</option>
                                            <option value="9">Sep-9</option>
                                            <option value="10">Oct-10</option>
                                            <option value="11">Nov-11</option>
                                            <option value="12">Dec-12</option>
                                        </select>
                                        <select name="trainingFromYear" onChange={(e) => this.handleTrainingChange(e)}>
                                            <option>Year</option>
                                            <option value="2020">2020</option>
                                            <option value="2019">2019</option>
                                            <option value="2018">2018</option>
                                            <option value="2017">2017</option>
                                            <option value="2016">2016</option>
                                        </select>
                                    </MDBCol>
                                    <MDBCol sm="6">
                                        <p>To</p>
                                        <select name="trainingToMonth" onChange={(e) => this.handleTrainingChange(e)}>
                                            <option>Month</option>
                                            <option value="1">Jan-1</option>
                                            <option value="2">Feb-2</option>
                                            <option value="3">March-3</option>
                                            <option value="4">April-4</option>
                                            <option value="5">May-5</option>
                                            <option value="6">June-6</option>
                                            <option value="7">July-7</option>
                                            <option value="8">Aug-8</option>
                                            <option value="9">Sep-9</option>
                                            <option value="10">Oct-10</option>
                                            <option value="11">Nov-11</option>
                                            <option value="12">Dec-12</option>
                                        </select>
                                        <select name="trainingToYear" onChange={(e) => this.handleTrainingChange(e)}>
                                            <option>Year</option>
                                            <option value="2020">2020</option>
                                            <option value="2019">2019</option>
                                            <option value="2018">2018</option>
                                            <option value="2017">2017</option>
                                            <option value="2016">2016</option>
                                        </select>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="primary" onClick={this.saveTrainingSection}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                    <div className="profile-box">
                        <div className="profile-box-header">
                            <h3>Projects</h3>
                        </div>
                        {
                            this.state.data.projectDetails != undefined ?
                                this.state.data.projectDetails.map((pd, i) => {
                                    return <div key={i}>
                                        <p><strong>{pd.title}</strong></p>
                                        <p>{pd.content}</p>
                                        <MDBBtn onClick={(e) => this.removeProject(e, td)}>X</MDBBtn>
                                    </div>
                                })
                                :
                                <p>Add your project/s experiance.</p>
                        }

                    </div>
                    <p><MDBBtn onClick={this.toggleProjectModal}>Add Project</MDBBtn></p>
                    <MDBModal isOpen={this.state.projectModal} toggle={this.toggleProjectModal}>
                        <MDBModalHeader toggle={this.toggleProjectModal}>Manage Skills</MDBModalHeader>
                        <MDBModalBody>
                            <MDBContainer>
                                <MDBRow>
                                    <MDBCol sm="12">
                                        <MDBInput
                                            label="Title"
                                            name="projectTitle"
                                            outline
                                            onChange={(e) => this.handleProjectChange(e)}
                                        />
                                    </MDBCol>
                                    <MDBCol sm="12">
                                        <p>Description</p>
                                        <textarea
                                            rows="3"
                                            label="Description"
                                            name="projectContent"
                                            onChange={(e) => this.handleProjectChange(e)}
                                            className="form-control"
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="primary" onClick={this.saveProjectSection}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                </div>
            </DefaultLayout >
        );
    }

}