import { NavLink, useNavigate } from "react-router-dom";
import './Nav.style.css';
import { UserContext } from "../UserProvider/userProvider";
import { useContext } from "react";
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";

export const Nav = () => {

  const {email, setEmail, isAdmin} = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogOut = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    signOut(auth)
    .then(()=> {
      console.log('user signed out')
      setEmail('')
      navigate('/login')
    })
    .catch((error) => console.log(error.message))
  }

  const navigateToAdmin = () => {
    navigate('/admin')
 }

    let activeStyle = {
        textDecoration: "none",
        background: "#75bbbb",
        color: "white", 
        height: "70px"
      };

    return (
        <nav>
          <div className='div-nav-container'>      
              <div>
                <NavLink
                   to="/Subjects"
                   style={({ isActive }) =>
                   isActive ? activeStyle : undefined}>

                   Przedmioty
                </NavLink>
              </div>

              <div className='div-my-notes-signout-button'>
                
              {!isAdmin &&
               <NavLink
                   to="/myNotes"
                   style={({ isActive }) =>
                   isActive ? activeStyle : undefined}>

                   Moje notatki
                </NavLink>
              }

            {isAdmin && <button className='button-add-subject' onClick={navigateToAdmin}>Dodaj przedmiot</button>}

                <button className='button-logout' onClick={handleLogOut}>Wyloguj</button>
              </div>
            </div>

              
        </nav>
    );
};
