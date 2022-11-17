import { NavLink, useNavigate } from "react-router-dom";
import './Nav.style.css';
import { UserContext } from "../UserProvider/userProvider";
import { useContext, useEffect} from "react";
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import logo from '../../img/logo.png'


export const Nav = () => {

  const {setEmail, isAdmin} = useContext(UserContext)
  const {school} = useContext(UserContext)
  const navigate = useNavigate()
  const user = auth.currentUser

  // const userOptions = [
  //   "one" , "two" , "three"
  // ]

  // const defaultUserOption = userOptions[0];
  // <Dropdown options={userOptions} onChange={this?._onSelect} value={defaultUserOption} placeholder="Select an option" />
  

  const handleLogOut = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    alert('Czy na pewno chcesz się wylogować?')
    signOut(auth)
    .then(()=> {
      setEmail('')
      navigate('/login')
    })
    .catch((error) => console.log(error.message))
  }

  const navigateToAdmin = () => {
    navigate('/admin')
 }

 const navigateToUserPanel = () => {
  navigate("/user-panel")
 }

 const navigateToSubjects = () => {
  navigate("/subjects")
 }

    let activeStyle = {
        borderBottom: "1px solid white",   
        borderLeft: "0px solid white",    
        borderRight: "0px solid white",    
        borderTop: "0px solid white",    
        padding: "5px",    
        fontWeight: "bold",
        background: "rgb(7, 143, 152)",
        color: "white", 
      };

    return (
        <nav>
          <div className='div-nav-container'>      
              <div className="avatar-school-container">
                  <img onClick={navigateToSubjects} className="navigation-logo" src={logo} alt={'hs notes'}/>
                  {/* <div className="user-school">{school}</div> */}
              </div>

              <div className='div-my-notes-signout-button'>
              <NavLink
                   to="/Subjects"
                   style={({ isActive }) =>
                   isActive ? activeStyle : undefined}>
                   
                   Przedmioty
                </NavLink>
                
              {!isAdmin &&
               <NavLink className="my-notes-style"
                   to="/my-notes"
                   style={({ isActive }) =>
                   isActive ? activeStyle : undefined}>

                   Moje notatki
                </NavLink>
              }

              {user?.photoURL && <img className="avatar" src={user?.photoURL} onClick={navigateToUserPanel}></img>}

              

            {isAdmin && <button className='button-add-subject' onClick={navigateToAdmin}>Dodaj przedmiot</button>}

                <div className="options-avatar-hover">
                   <button className='button-logout' onClick={handleLogOut}>Wyloguj</button>
                   {/* <div className="user-name">{user?.displayName}</div>
                   <h2>Przejdz do panelu użytkownika</h2> */}
                </div>
              </div>
            </div>

              
        </nav>
    );
};
