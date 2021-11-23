import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateMentor from './CreateUsers/CreateMentor';
import CreateStudent from './CreateUsers/CreateStudent';
import ListStuForMentor from "./ListStuForMentor";
import AssignMentor from "./AssignMentor";
import MultipleStudentAssign from "./multipleStudentAssign";
import Header from './Components/Header';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<CreateMentor />} />
            <Route path="/createstudent" exact element={<CreateStudent />} />
            <Route path="/creatementor" exact element={<CreateMentor />} />
            <Route path="/liststuformentor" exact element={<ListStuForMentor />} />
            <Route path="/assignmentor" exact element={<AssignMentor />} />
            <Route path="/multiplestudentassign" exact element={<MultipleStudentAssign />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
