import React, { useContext, useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import './Register.style.css'
import { UserContext } from "../UserProvider/userProvider";

export const Register = () => {

    const {email, setEmail, password, setPassword} = useContext(UserContext)
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e: any) => {
        console.log("OK")
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => navigate('/login'))
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
        <>  <div className="register">
                {error && <div>{error}</div> }
                <form onSubmit={handleRegister}>

                    <h1>Zarejestruj się</h1>

                    <div className="email-area">
                        <span>Email:</span>
                        <label htmlFor="register-input"></label>
                        <input className="register-input" placeholder="JohnSnow34" onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="email-area">
                        <span>Hasło:</span>
                        <label htmlFor="password-input"></label>
                        <input className="password-input" onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <button className="register-btn">Zarejestruj</button>    
                </form>

                <p className="register-p">Masz konto? <Link to='/login' className="login-link">Przejdź do logowania!</Link></p>
            </div>
        </>
     );
}
 
