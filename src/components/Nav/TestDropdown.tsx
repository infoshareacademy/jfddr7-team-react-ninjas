import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useContext} from "react"
import { auth } from "../../firebase"
import { UserContext } from "../UserProvider/userProvider"
import "./TestDropdown.style.css"

export const TestDropdown = () => {
    const {setEmail} = useContext(UserContext)
    const navigate = useNavigate()
    const user = auth.currentUser

    const handleLogOut = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        alert('Czy na pewno chcesz się wylogować?')
        signOut(auth)
        .then(()=> {
          setEmail('')
          navigate('/login')
        })}
    return (
        <div className="test-menu-dropdown">
            {user?.photoURL && <img className="user-avatar-dropdown" src={user?.photoURL}></img>}
            <div className="user-name-dropdown">{user?.displayName}</div>                       
            <div><button>Panel użytkownika</button></div>
            <button className='button-logout-dropdown' onClick={handleLogOut}>Wyloguj</button>
        </div>
    )
}

