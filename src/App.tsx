import './App.css';
import { Register } from './components/Register/Register';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Subjects } from './components/Subjects/Subjects';
import { SubjectNotes } from './components/SubjectNotes/SubjectNotes';
import { Admin } from './components/Admin/Admin'
import { MyNotes } from './components/MyNotes/MyNotes';
import { CityChoice } from './components/SchoolChoice/SchoolChoice';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useContext, useEffect } from 'react';
import { UserContext } from './components/UserProvider/userProvider'
import { SubjectsListContext } from './components/SubjectsListProvider/SubjectListProvider'
import { AvatarChoice } from './components/AvatarChoice/AvatarChoice';
import { NoteList } from './components/NoteList/NoteList';
import { Note } from './components/Note/Note';
import { UserPanel } from './components/UserPanel/UserPanel';




function App() {

  const auth = getAuth();
  const navigate = useNavigate();

  const {email, setEmail, isAdmin, setIsAdmin} = useContext(UserContext) 
  const {subjects, setSubjects} = useContext(SubjectsListContext)


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        console.log(user)
        navigate('/subjects')
        setEmail(user.email || '')
        setIsAdmin(false)
        if(user.uid == 'toG7crgaRaPdSmMzT57BMabo3hJ3'){
          setIsAdmin(true)
          console.log('admin')
        }
      }else{
        navigate('/login')
      }
    })
  },[])


  return (
    <div className="App">
    <Routes>
      <Route path='/register' element={<Register />}>
      </Route>
      <Route path='/avatar-choice' element={<AvatarChoice />}>
      </Route>
      <Route path='/login' element={<Login />}>
      </Route>
      <Route path='/subjects' element={<Subjects />}>
      </Route>
      <Route path='/subjects/:id' element={<SubjectNotes />}>
      </Route>
      <Route path='/subjects/:id/:id' element={<NoteList />}>
      </Route>
      <Route path='/subjects/:id/:id/:id' element={<Note />}>
      </Route>
      <Route path='/admin' element={<Admin />}>
      </Route>
      <Route path='/school-choice' element={<CityChoice />}>
      </Route>
      <Route path='/my-notes' element={<MyNotes />}>
      </Route>
      <Route path='/user-panel' element={<UserPanel />}/>
    </Routes>
    </div>
  );
}
  
export default App;
