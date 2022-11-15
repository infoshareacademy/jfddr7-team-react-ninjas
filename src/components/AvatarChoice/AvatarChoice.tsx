import '../AvatarChoice/AvatarChoice.style.css'
import { avatars } from '../Avatars/Avatars'
import image from '../../img/bookshelf.jpeg'
import { useContext, useState } from 'react'
import { UserContext } from '../UserProvider/userProvider'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { updateProfile } from 'firebase/auth'


export const AvatarChoice = () => {

    const user = auth.currentUser;
    const [current, setCurrent] = useState(0)
    const {avatar, setAvatar} = useContext(UserContext)
    const navigate = useNavigate()

    const addAvatar = () => {
        if(user){
            console.log(user)
            updateProfile(user, {photoURL: avatar})
            console.log(user)
        }
       
        navigate('/city-choice')
        };

    return ( 
        
        <div className='background' style={{backgroundImage:`url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>
            <div className="avatars-container">
                {avatars.map((avatar) => (
                    <img 
                        key={avatar.id}
                        src={avatar.src} 
                        onClick={()=>{
                            setCurrent(avatar.id)
                            setAvatar(avatar.src)
                        }} 
                        className={avatar.id === current ? 'active' : ''} 
                    />
                ))}
                
                <button className='Next-button' onClick={addAvatar}>Dalej</button>
            </div>
        </div>

     );
}
