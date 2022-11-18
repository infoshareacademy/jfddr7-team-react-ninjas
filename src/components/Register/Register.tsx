import React, { useContext, useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import './Register.style.css'
import { UserContext } from "../UserProvider/userProvider";
import image from '../../img/takingNotes.png'
import logo from '../../img/logo.png'

export const Register = () => {

    const {userName, setUserName, email, setEmail, password, setPassword} = useContext(UserContext)
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((data)=> updateProfile(data.user, {displayName: userName}))
        .then(() => navigate('/avatar-choice', {state: {from: '/register'}}))
        .catch((e)=> {
            if (e.code === 'auth/invalid-email') {
                setError('Podana wartość nie jest adresem email - spróbuj ponownie.');
            } 
            if (e.code === 'auth/email-already-in-use') {
                setError('Ten adres email jest już używany przez innego uzytkownika - spróbuj ponownie.');
            } 
            if (e.code === 'auth/weak-password') {
                setError('Hasło jest za słabe - spróbuj ponownie.');
            } 
            if (e.code === 'auth/wrong-password'){
                setError('Błędne hasło - spróbuj ponownie');
            } else {
                console.log(e.code);
                setError('Hasło jest za słabe - spróbuj ponownie.');
            }
        })
    }

    return ( 

        <div className="register-container" style={{backgroundImage:`url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>

              <div className="register">
                <img className="logo" src={logo} alt={'hs notes'}/>
                <h3>Zarejestruj się i korzystaj z bazy notatek!</h3>
                {error && <div className="error-message">{error}</div>}
               
                <form onSubmit={handleRegister}>

                    <div className="name-area">
                        <label htmlFor="name-input">Nick:</label>
                        <input className="name-input" id="name-input" placeholder="Johnny34" required onChange={(e) => setUserName(e.target.value)}/>
                    </div>

                    <div className="email-area">
                        <label htmlFor="register-input">Email:</label>
                        <input className="register-input" id="register-input" placeholder="JohnSnow34" required onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="password-area">
                        <label htmlFor="password-input">Hasło:</label>
                        <input className="password-input" id="password-input" type='password' required onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <button className="register-btn">Zarejestruj</button>    
                </form>

                <p className="register-p">Masz konto? <Link to='/login' className="login-link">Przejdź do logowania!</Link></p>
            </div>

        </div>

     );
}
 
