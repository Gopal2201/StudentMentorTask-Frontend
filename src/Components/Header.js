import * as React from 'react';
import {AppBar, Box, Toolbar, Typography, Link } from '@mui/material';

function Header() {
    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center"}}>
                Student-Mentor
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{backgroundColor: "grey"}}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center"}}>
                <Link href="/creatementor" sx={{color: "white"}}>
                  Create Mentor
                </Link>
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center"}}>
                <Link href="/createstudent" sx={{color: "white"}}>
                    Create Student
                </Link>
              </Typography> 
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center"}}>
                <Link href="/assignmentor" sx={{color: "white"}}>
                    Assign Mentor to Student
                </Link>
              </Typography>           
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center"}}>
                <Link href="/liststuformentor" sx={{color: "white"}}>
                    List Students For Mentor
                </Link>
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center"}}>
                <Link href="/multiplestudentassign" sx={{color: "white"}}>
                    Multiple Student Assign
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        </>
  );
}

export default Header;