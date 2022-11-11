import './App.css';
import { Register } from './components/Register/Register';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Subjects } from './components/Subjects/Subjects';
import { SubjectNotes } from './components/SubjectNotes/SubjectNotes';
import { Admin } from './components/Admin/Admin'
import { CityChoice } from './components/SchoolChoice/SchoolChoice';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useContext, useEffect } from 'react';
import { UserContext } from './components/UserProvider/userProvider'



function App() {

  const auth = getAuth();
  const navigate = useNavigate();

  const {email, setEmail} = useContext(UserContext) // wez email z firebase i ustaw w context
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        navigate('/subjects')
        setEmail(user.email || '')
      }else{
        navigate('/login')
      }
    })
  },[])

  console.log(email)

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
      <Route path='/choice' element={<CityChoice />}>
      </Route>
    </Routes>
    </div>
  );
}
  
export default App;
