import '../AvatarChoice/AvatarChoice.style.css'
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
import image from '../../img/bookshelf.jpeg'
import { useContext, useState } from 'react'
import { UserContext } from '../UserProvider/userProvider'
import { useNavigate } from 'react-router-dom'


export const AvatarChoice = () => {

    const [trialAvatar, setTrialAvatar] = useState('')
    const {avatar, setAvatar} = useContext(UserContext)
    const navigate = useNavigate()

    const addAvatar = () => {
        setAvatar(trialAvatar)
        navigate('/subjects')
    }

    return ( 
        
        <div className='background' style={{backgroundImage:`url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>
            <div className="avatars-container">
                <img src={avatar1} onClick={()=> setTrialAvatar(avatar1)}></img>
                <img src={avatar2} onClick={()=> setTrialAvatar(avatar2)}></img>
                <img src={avatar3} onClick={()=> setTrialAvatar(avatar3)}></img>
                <img src={avatar4} onClick={()=> setTrialAvatar(avatar4)}></img>
                <img src={avatar5} onClick={()=> setTrialAvatar(avatar5)}></img>
                <img src={avatar6} onClick={()=> setTrialAvatar(avatar6)}></img> 
                <img src={avatar7} onClick={()=> setTrialAvatar(avatar7)}></img>
                <img src={avatar8} onClick={()=> setTrialAvatar(avatar8)}></img>
                <img src={avatar9} onClick={()=> setTrialAvatar(avatar9)}></img>
                <img src={avatar10} onClick={()=> setTrialAvatar(avatar10)}></img>
                <img src={avatar11} onClick={()=> setTrialAvatar(avatar11)}></img>
                <img src={avatar12} onClick={()=> setTrialAvatar(avatar12)}></img>  
                <button className='Next-button' onClick={addAvatar}>Dalej</button>
            </div>
        </div>

     );
}
