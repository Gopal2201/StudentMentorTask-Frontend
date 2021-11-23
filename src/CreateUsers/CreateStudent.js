import { Component } from "react";
import axios from "axios";
import {Grid, Button} from "@mui/material";

class CreateStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StudentName: "",
            StudentMail: "",
            allerror: "",
            MentorList: [],
            MID: "",
        }
    }

    handleChange = ({target: {name, value}}) => {
        this.setState({...this.state, [name]: value});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        // To create a new student with assigning Mentor
        if (this.state.StudentName && this.state.StudentMail && this.state.MID) {
            const {StudentName, StudentMail, MID} = this.state;
            
            await axios.post("https://student-mentor-task.herokuapp.com/create/student", {StudentName, StudentMail, MID});
            alert("Student Added Successfully")
        } 
        // To create a new student without Mentor
        else if (this.state.StudentName && this.state.StudentMail) {
            const {StudentName, StudentMail} = this.state;
            await axios.post("https://student-mentor-task.herokuapp.com/create/student", {StudentName, StudentMail});
            alert("Student Added Successfully")
        } else {
            const error = "Enter All Details";
            this.setState({allerror: error});
        }
    }

    getMentorDetails = async() => {
        const {data} = await axios.get("https://student-mentor-task.herokuapp.com/list/mentor")
        console.log(data);
        this.setState({MentorList: data});
    };

    componentDidMount() {
        this.getMentorDetails();
    }

    render() {
        return(
            <>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <div>
                        <h2>Student Creation</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <h3><label>Enter Student Name: </label></h3>
                                <input type="text" name="StudentName" value={this.state.StudentName} onChange={this.handleChange} />
                            </div>
                            <div>
                                <h3><label>Enter Student Mail: </label></h3>
                                <input type="email" name="StudentMail" value={this.state.StudentMail} onChange={this.handleChange} />
                            </div>
                            <h3>Select Mentor Name(Optional)</h3>
                            <select name="MID" value={this.state.MID} onChange={this.handleChange}>
                                <option value="none" selected> Select Mentor</option>
                                {this.state.MentorList.map((post) => {
                                    return(
                                        <option value={post._id}>{post.MentorName}</option>
                                    )
                                })}
                            </select> <br/><br/>
                            <div>
                                <Button variant="contained" type="submit">Create Student</Button>
                            </div>
                        </form>
                    </div>
                </Grid>
            {this.state.allerror}
            </>
        )
    }
}

export default CreateStudent;