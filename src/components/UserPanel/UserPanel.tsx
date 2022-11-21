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
import logo from '../../img/logo.png'
import image from '../../img/takingNotes.png'




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
        if(!isNickDisable && user){
            await updateProfile(user, {displayName: userNick})     
            setUserName(userNick || "")
        }
    }
    
    



    return (
        <div className="user-panel-container">
            <Nav />
            <div className="user-panel-main">
            <div className="user-panel">
            
                <div className="user-panel-avatar-container">
                   {user?.photoURL && <img className="user-panel-avatar" src={user?.photoURL}></img>}
                   <img onClick={navigateToAvatar} className="edit-avatar edit-button" src={editlogo} alt="editlogo" />
                </div>

                <div className="user-panel-nick-container user-panel-block">
                    <p className="user-panel-paragraf">Nick:</p>
                     <div className="user-panel-information">
                     <input onChange={(e) => setUserNick(e.target.value)} className={isNickDisable ? "disable" : "enabled"} disabled={isNickDisable} type="text" value={userNick || ""}/> 
                     <img onClick={navigateToNick} className="edit-nick edit-button" src={editlogo} alt="editlogo" />
                     </div>
                </div>              
                
                <div className="user-panel-school-container user-panel-block">
                   <p className="user-panel-paragraf">Szkoła:</p>
                    <div className="user-panel-information">
                       {school}
                       <img onClick={navigateToSchool} className="edit-school edit-button" src={editlogo} alt="editlogo" />
                    </div>
                </div>

                <div className="user-panel-email-container user-panel-block">
                   <p className="user-panel-paragraf">Email: </p> {user?.email} 
                </div>
                
            </div>
            </div>
            
        </div>
        
    )
}