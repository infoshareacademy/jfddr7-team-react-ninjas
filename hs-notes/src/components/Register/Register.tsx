import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
        <>
            {error && <div>{error}</div> }
            <form onSubmit={handleRegister}>
                <label htmlFor="register-input">Email:</label>
                <input id="register-input" placeholder="JohnSnow34" onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password-input">Hasło:</label>
                <input id="password-input" onChange={(e) => setPassword(e.target.value)}/>
                <button>Zarejestruj</button>
            </form>
        </>
     );
}
 
