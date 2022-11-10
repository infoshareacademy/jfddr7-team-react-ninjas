import './App.css';
import { Register } from './components/Register/Register';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Subjects } from './components/Subjects/Subjects';
import { SubjectNotes } from './components/SubjectNotes/SubjectNotes';
import { Admin } from './components/Admin/Admin'
import { CityChoice } from './components/SchoolChoice/SchoolChoice';



function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/login' element={<Login />}>
      </Route>
      <Route path='/register' element={<Register />}>
      </Route>
      <Route path='/subjects' element={<Subjects />}>
      </Route>
      <Route path='/subjects/:id' element={<SubjectNotes />}>
      </Route>
      <Route path='/admin' element={<Admin />}>
      </Route>
      <Route path='choice' element={<CityChoice />}>
      </Route>
    </Routes>
    </div>
  );
}
  
  

export default App;
