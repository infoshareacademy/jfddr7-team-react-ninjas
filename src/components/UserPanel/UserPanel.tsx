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
import profilelogo from '../../../src/img/profilelogo.png'
import editlogo from '../../../src/img/editlogo.png'
import { Nav } from "../Nav/Nav"
import { updateProfile } from "firebase/auth"
import { async } from "@firebase/util"




export const UserPanel = () => {
    const {school, setSchool, setUserName} = useContext(UserContext)
    const [current, setCurrent] = useState('')
    const [isNickDisable, setIsNickDisable] = useState(true)
    const navigate = useNavigate()
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11, avatar12]
    const user = auth.currentUser
    const [userNick, setUserNick] = useState(user?.displayName)

    console.log(user)

    const navigateToAvatar = () => {
        navigate('/avatar-choice', {state: {from: '/user-panel'}})
    }

    const navigateToSchool = () => {
        navigate("/school-choice" , {state: {from: '/user-panel'}})
    }

    const navigateToNick = async () => {
        setIsNickDisable(!isNickDisable)
        console.log(isNickDisable)
        console.log(user)
        if(!isNickDisable && user){
            await updateProfile(user, {displayName: userNick})     
            setUserName(userNick || "")
        }
    }
    
    



    return (
        <div className="user-panel-container">
            <Nav />
            <div className="user-panel-header">
              <h1>Panel Użytkownika</h1>
              <img className="profile-logo" src={profilelogo} alt="profilelogo" />
            </div>
            <div className="user-panel">
                <div className="user-panel-avatar user-panel-block">
                   Avatar: {user?.photoURL && <img className="avatar" src={user?.photoURL}></img>}
                   <img onClick={navigateToAvatar} className="edit-avatar edit-button" src={editlogo} alt="editlogo" />
                </div>

                <div className="user-panel-emial user-panel-block">
                   Email: {user?.email} 
                </div>
                
                <div className="user-panel-nick user-panel-block">
                    Nick: <input onChange={(e) => setUserNick(e.target.value)} className={isNickDisable ? "disable" : "enabled"} disabled={isNickDisable} type="text" value={userNick || ""}/> 
                   <img onClick={navigateToNick} className="edit-nick edit-button" src={editlogo} alt="editlogo" />
                </div>

                <div className="user-panel-school user-panel-block">
                   Szkoła: {school}
                   <img onClick={navigateToSchool} className="edit-school edit-button" src={editlogo} alt="editlogo" />
                </div>
                
            </div>
        </div>
        
    )
}