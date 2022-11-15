import { NavLink, useNavigate } from "react-router-dom";
import './Nav.style.css';
import { UserContext } from "../UserProvider/userProvider";
import { useContext, useState, useEffect } from "react";
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { userInfo } from "os";

export const Nav = () => {

  const {email, setEmail, isAdmin, avatar} = useContext(UserContext)
  const {school, setSchool} = useContext(UserContext)

  const user = auth.currentUser

  const navigate = useNavigate()

  const handleLogOut = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    alert('Czy na pewno chcesz się wylogować?')
    signOut(auth)
    .then(()=> {
      console.log('user signed out')
      setEmail('')
      navigate('/login')
    })
    .catch((error) => console.log(error.message))
  }

  console.log(`to jest ${user?.photoURL}`)

  const navigateToAdmin = () => {
    navigate('/admin')
 }

    let activeStyle = {
        textDecoration: "none",
        background: "#75bbbb",
        color: "white", 
      };

    return (
        <nav>
          <div className='div-nav-container'>      
              <div className="avatar-school-container">
                  {user?.photoURL && <img className="avatar" src={user?.photoURL}></img>}
                  <div>{school}</div>
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
                   to="/my-notes"
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
