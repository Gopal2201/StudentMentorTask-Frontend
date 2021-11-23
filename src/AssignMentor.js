import axios from "axios";
import { Component } from "react";

import {Grid, Button} from "@mui/material";

class AssignMentor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MentorList: [],
            StudentList: [],
            SID: "",
            MID: "",
        }
    }

    getMentorStuDetails = async() => {
        const {data} = await axios.get("https://student-mentor-task.herokuapp.com/list/mentor")
        const stuData = await axios.get("https://student-mentor-task.herokuapp.com/list/getallstudents")
        this.setState({MentorList: data, StudentList:stuData.data});
    }

    componentDidMount() {
        this.getMentorStuDetails();
    }

    handleSubmit = async () => {
        const {MID, SID} = this.state;
        await axios.patch(`https://student-mentor-task.herokuapp.com/update/mentor/${SID}`, {MID});
        alert("Mentor Assigned Successfully");
    }

    handleChange = ({target: {name, value}}) => {
        console.log(name, value);
        this.setState({...this.state, [name]: value});
    }

    render() {
        return(
            <>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <div>
                    <h2>Select Student Name</h2>
                    <select name="SID" value={this.state.SID} onChange={this.handleChange}>
                        <option value="none" selected> Select Student</option>
                        {this.state.StudentList.map((post) => {
                            return(
                                <option value={post._id}>{post.StudentName}</option>
                            )
                        })}
                    </select>
                    <br/>
                    <h2>Select Mentor Name</h2>
                    <select name="MID" value={this.state.MID} onChange={this.handleChange}>
                        <option value="none" selected> Select Mentor</option>
                        {this.state.MentorList.map((post) => {
                            return(
                                <option value={post._id}>{post.MentorName}</option>
                            )
                        })}
                    </select>
                    <br/><br/>
                    <Button variant="contained" onClick={this.handleSubmit}>Assign Mentor</Button>
                </div>
            </Grid>
            </>
        )
    }
}

export default AssignMentor;