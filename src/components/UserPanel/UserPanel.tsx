import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../UserProvider/userProvider"
import "./UserPanel.style.css"
import { auth } from "../../firebase"
import avatar1 from '../../../src/img/avatars/av1.png'
import avatar2 from '../../../src/img/avatars/av2.png'
import avatar3 from '../../../src/img/avatars/av3.png'
import avatar4 from '../../../src/img/avatars/av4.png'
import avatar5 from '../../../src/img/avatars/av5.png'
import avatar6 from '../../../src/img/avatars/av6.png'
import avatar7 from '../../../src/img/avatars/av7.png'
import avatar8 from '../../../src/img/avatars/av8.png'
import avatar9 from '../../../src/img/avatars/av9.png'
import avatar10 from '../../../src/img/avatars/av10.png'
import avatar11 from '../../../src/img/avatars/av11.png'
import avatar12 from '../../../src/img/avatars/av12.png'



export const UserPanel = () => {
    const {avatar, setAvatar} = useContext(UserContext)
    const {email, setEmail} = useContext(UserContext)
    const {school, setSchool} = useContext(UserContext)
    const [citiesList, setCitiesList] = useState([""]);
    const [schoolList, setSchoolList] = useState([""]);
    const [filterSchoolList, setFilterSchoolList] = useState([""]);
    const [current, setCurrent] = useState('')
    const navigate = useNavigate()
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11, avatar12]
    const user = auth.currentUser
    user?photoURL
    



    return (
        <div className="user-panel-container">
            <h1>Panel Użytkownika</h1>
            <div className="user-panel">
                <p>avatar {avatar}</p>
                <p>Zmień avatara</p>
                <p>emial {email}</p>
                <p>Zmień emial</p>
                <p>Nick</p>   
                <p>Zmień Nick</p>
                <p>Szkoła {school}</p>
                <p>Zmień szkołę </p>

            </div>
        </div>
        
    )
}