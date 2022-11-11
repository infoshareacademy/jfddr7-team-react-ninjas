import { useState } from "react"
import {  signInWithEmailAndPassword,  GoogleAuthProvider, signInWithPopup, FacebookAuthProvider} from 'firebase/auth';
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import './Login.style.css'





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

    const SingInWithFacebook = (e: any) => {
        e.preventDefault();
        const facebookProvider = new FacebookAuthProvider();
        signInWithPopup(auth, facebookProvider)
        .then((re)=>{
            console.log(re)
        })
        .catch((err)=> {
            console.log(err.message)
        })
    }

    const SingInWithGoogle = (e: any) => {
        e.preventDefault();
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth , googleProvider)
        .then((re)=>{
            const credential = GoogleAuthProvider.credentialFromResult(re);
            if (!credential) {
                throw Error("No token")
            }
            console.log(re);
            const token = credential.accessToken;    
            const user = re.user;
        })
        .catch((err)=>{
            console.log(err)
            
        })    
    }

    const loginHandler = (e: any) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => console.log('Succes'))
            .then(() => setLoggedUser(email))
            .then(() => console.log(loggedUser))
            .then(() => console.log(auth.currentUser))
            .then(() => navigate('/Subjects'))
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

                <div className="google-area">
                    <button className="google-login" onClick={SingInWithGoogle}><img src="https://image.similarpng.com/thumbnail/2020/12/Flat-design-Google-logo-design-Vector-PNG.png" alt=""/> <p>Zaloguj przez Google</p></button>
                </div>

                <div className="facebook-area">
                    <button className="facebook-login" onClick={SingInWithFacebook}><img src="https://toppng.com/uploads/preview/facebook-social-icon-logo-joe-eckley-facebook-page-management-icon-11553485296y89sa59plk.png" alt=""/> <p>Zaloguj przez Facebook</p></button>
                </div>
                    
                <span>Email:</span>
                <div className="email-area">
                    <label htmlFor="email"></label>
                    <input type="text" name="email" id="email" placeholder="JohnSnow34" onChange={handleEmail}/>
                </div>

                <span>Hasło:</span>
                <div className="password-area">
                    <label htmlFor="password"></label>
                    <input type="password" name="password" id="password" placeholder="Tu wpisz swoje hasło" onChange={handlePassword}/>
                </div>
            </form>
            <button className="login-btn" onClick={loginHandler}>Kliknij żeby zalogować</button>
        </div>
    )
}