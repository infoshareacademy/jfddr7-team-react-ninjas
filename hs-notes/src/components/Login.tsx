import { useState } from "react"
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";


export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedUser, setLoggedUser] = useState('');

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
            .catch((e) => console.log(e))
    }


    return (
        <div className="login">
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