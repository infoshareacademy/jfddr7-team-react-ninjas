import './App.css';
import { Register } from './components/Register/Register';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Subjects } from './components/Subjects/Subjects';


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/login' element={<Login />}>
      </Route>
      <Route path='/register' element={<Register />}>
      </Route>
      <Route path='/home' element={<Subjects />}>
      </Route>
    </Routes>
    </div>
  );
}
  
  

export default App;
