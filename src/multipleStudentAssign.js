import axios from "axios";
import { Component } from "react";

import { Grid, Button, FormGroup, Checkbox, FormControlLabel } from "@mui/material"

class multipleStudentAssign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MentorList: [],
            StudentList: [],
            SelectedStu: [],
            id: "",
        }
    }

    getMentorDetails = async() => {
        // to get the list of all mentors
        const {data} = await axios.get("https://studentmentortask.herokuapp.com/list/mentor")
        console.log(data);
        // To get the list of students with no mentors assigned
        const response = await axios.get("https://studentmentortask.herokuapp.com/list/nomentorstudents")
        console.log(response);
        this.setState({MentorList: data, StudentList: response.data});
    }

    componentDidMount() {
        this.getMentorDetails();
    }

    handleChange = ({target: {name, value, checked, type}}) => {
        if (type === "checkbox"){ 
            if(checked){
                this.state.SelectedStu.push({name})
            } else if(!checked) {
                this.state.SelectedStu.pop();
            }
        } else {
            this.setState({...this.state, [name]: value});
        }
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        console.log(this.state.id);
        if (this.state.SelectedStu.length !== 0 && this.state.id)
        {
            const {id, SelectedStu} = this.state;
            await axios.post("https://studentmentortask.herokuapp.com/list/updatenomentorstudents", {id, SelectedStu});
            alert("Mentor Assigned Successfully")
            window.location.reload();
        } else {
            console.log("Provide all details");
        }
    }

    render() {
        return (
            <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                >
            <div>
            <h2>Assign Sutdents to One Mentor</h2>
            <select name="id" value={this.state.id} onChange={this.handleChange}>
            <option value="none" selected> Select Mentor</option>
            {this.state.MentorList.map((post) => {
                return(
                    <option value={post._id}>{post.MentorName}</option>
                )
            })}
            </select>
            <br/><br/><br/>
            {this.state.StudentList.map((post) => {
                return(
                    <div key={post._id}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox name={post._id} onChange={this.handleChange} />} label={post.StudentName} />
                        </FormGroup>
                    </div>
                )
            })}
            <br/>
            <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
            </div>
            </Grid>
            </>
        )
    }
}

export default multipleStudentAssign;