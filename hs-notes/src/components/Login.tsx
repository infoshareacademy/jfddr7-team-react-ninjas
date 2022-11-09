import { useState } from "react"
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedUser, setLoggedUser] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmail = (e: any) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const loginHandler = (e: any) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => console.log('Succes'))
            .then(() => setLoggedUser(email))
            .then(() => console.log(loggedUser))
            .then(() => console.log(auth.currentUser))
            .then(() => navigate('/home'))
            .catch((e) => {
                if (e.code === 'auth/user-not-found') {
                    setError('Brak takiego użytkownika w bazie danych - spróbuj ponownie.');
                } 
                if (e.code === 'auth/wrong-password') {
                    setError('Złe hasło - spróbuj ponownie.');
                }
                if (e.code === 'auth/invalid-email') {
                    setError('Wpisany tekst, nie jest adresem Email - spróbuj ponownie.');
                } else {
                    console.log(e);
                    setError('Wystąpił nieznany błąd....');
                }
                
            })
    }


    return (
        <div className="login">
            {error && <div>{error}</div> }
            <form action="">
                <div className="email-area">
                    <label htmlFor="email">Podaj email: </label>
                    <input type="text" name="email" id="email" onChange={handleEmail}/>
                </div>
                <div className="password-area">
                    <label htmlFor="email">Podaj hasło: </label>
                    <input type="text" name="email" id="email" onChange={handlePassword}/>
                </div>
            </form>
            <button onClick={loginHandler}>Kliknij żeby zalogować</button>
        </div>
    )
}