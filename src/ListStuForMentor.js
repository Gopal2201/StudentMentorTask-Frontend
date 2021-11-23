import axios from "axios";
import { Component } from "react";

import {Grid, Button, Table, TableHead, TableRow,TableCell, TableBody, TableContainer, Paper} from "@mui/material";

class ListStuForMentor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MentorList: [],
            StudentList: [],
            MID: "",
            MentorName: "",
        }
    }
    // To get all mentor list and update state
    getMentorDetails = async() => {
        const {data} = await axios.get("https://studentmentortask.herokuapp.com/list/mentor")
        console.log(data);
        this.setState({MentorList: data});
    }

    componentDidMount() {
        this.getMentorDetails();
    }

    handleSubmit = async () => {
        const {MID} = this.state;
        console.log(MID);
        // To get the student list for mentor
        const {data} = await axios.post("https://studentmentortask.herokuapp.com/list/studentsformentor", {MID});
        console.log(data);
        this.setState({StudentList: data});
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
                    <h2>Select Mentor Name</h2>
                    <select name="MID" value={this.state.MID} onChange={this.handleChange}>
                    <option value="none" selected> Select Mentor</option>
                    {this.state.MentorList.map((post) => {
                        return(
                            <option value={post._id}>{post.MentorName}</option>
                        )
                    })}
                    </select> <br/><br/>
                    <Button variant="contained" onClick={this.handleSubmit}>Get List</Button>
                    <br/><br/><br/>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 250 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Students Name List</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                          {this.state.StudentList.map((post) => {
                            return(
                                <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                  {post.StudentName}
                                </TableCell>
                                </TableRow>
                            )
                        })}
                          </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Grid>
            </>
        )
    }
}

export default ListStuForMentor;