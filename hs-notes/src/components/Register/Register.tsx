import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = (e:any) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((data) => console.log("OK"))
        .catch((error)=> console.log(error.message))
    }

    return ( 
        <form onSubmit={handleRegister}>
            <label htmlFor="register-input">Email:</label>
            <input id="register-input" placeholder="JohnSnow34" onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="password-input">Hasło:</label>
            <input id="password-input" onChange={(e) => setPassword(e.target.value)}/>
            <button>Zarejestruj</button>
        </form>
     );
}
 
