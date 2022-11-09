import './App.css';
import { Register } from './components/Register/Register';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login/Login';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/login' element={<Login />}>
      </Route>
      <Route path='/register' element={<Register />}>
      </Route>
      <Route path='/home' element={<Register />}>
      </Route>
    </Routes>
    </div>
  );
}
  
  

export default App;
