import React, { ReactEventHandler, useContext, useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import './Register.style.css'
import { UserContext } from "../UserProvider/userProvider";
import image from '../../img/bookshelf.jpeg'
import logo from '../../img/logo.png'

export const Register = () => {

    const {email, setEmail, password, setPassword} = useContext(UserContext)
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => navigate('/avatar-choice'))
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

                    <div className="email-area">
                        <span>Email:</span>
                        <label htmlFor="register-input"></label>
                        <input className="register-input" placeholder="JohnSnow34" required onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="email-area">
                        <span>Hasło:</span>
                        <label htmlFor="password-input"></label>
                        <input className="password-input" type='password' required onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <button className="register-btn">Zarejestruj</button>    
                </form>

                <p className="register-p">Masz konto? <Link to='/login' className="login-link">Przejdź do logowania!</Link></p>
            </div>

        </div>

     );
}
 
