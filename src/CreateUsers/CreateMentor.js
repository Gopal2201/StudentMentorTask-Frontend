import { Component } from "react";
import axios from "axios";

import {Grid, Button} from "@mui/material";

class CreateMentor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MentorName: "",
            MentorMail: "",
            allerror: ""
        }
    }

    handleChange = ({target: {name, value}}) => {
        this.setState({...this.state, [name]: value});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.MentorName && this.state.MentorMail) {
            const {MentorName, MentorMail} = this.state;
            //API Call
            await axios.post("https://student-mentor-task.herokuapp.com/create/mentor", {MentorName, MentorMail});
            alert("Mentor Created Successfully")
        } else {
            const error = "Enter All Details";
            this.setState({allerror: error});
        }
    }

    render() {
        return(
            <>
                <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                >
                <div>
                    <h2>Mentor Creation</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <h3><label>Enter Mentor Name: </label></h3>
                            <input type="text" name="MentorName" value={this.state.MentorName} onChange={this.handleChange} />
                        </div>
                        
                        <div>
                            <h3><label>Enter Mentor Mail: </label></h3>
                            <input type="email" name="MentorMail" value={this.state.MentorMail} onChange={this.handleChange} />
                        </div><br/><br/>
                        <div>
                            <Button variant="contained" type="submit">Create Mentor</Button>
                        </div>
                    </form>
                    {this.state.allerror}
                </div>
            </Grid>
            </>
        )
    }
}

export default CreateMentor;