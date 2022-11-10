import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Register.style.css'

export const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e:any) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log("OK"))
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
            } else {
                console.log(e.code);
                setError('Hasło jest za słabe - spróbuj ponownie.');
            }
        })
    }

    return ( 
        <>  <div className="register">
                {error && <div>{error}</div> }
                <form>

                    <h1>Register Panel</h1>

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

                                   

                </form>
                <button className="register-btn" onSubmit={handleRegister}>Zarejestruj</button>    
            </div>
        </>
     );
}
 
