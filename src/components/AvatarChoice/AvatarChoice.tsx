import '../AvatarChoice/AvatarChoice.style.css'
// import { avatars } from '../Avatars/Avatars'
import image from '../../img/bookshelf.jpeg'
import React, { useContext, useState } from 'react'
import { UserContext } from '../UserProvider/userProvider'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { getAuth, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadString } from "firebase/storage";

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

const avatars = 
[
    {id:1, src:avatar1}, 
    {id:2, src:avatar2}, 
    {id:3, src:avatar3}, 
    {id:4, src:avatar4}, 
    {id:5, src:avatar5}, 
    {id:6, src:avatar6}, 
    {id:7, src:avatar7}, 
    {id:8, src:avatar8}, 
    {id:9, src:avatar9}, 
    {id:10, src:avatar10}, 
    {id:11, src:avatar11}, 
    {id:12, src:avatar12}
]



export const AvatarChoice = () => {

    const user = auth.currentUser;
    const [current, setCurrent] = useState(0)
    const {avatar, setAvatar} = useContext(UserContext)
    const navigate = useNavigate()
    const storage = getStorage();

   

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
