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
import React, { useContext, useState } from 'react'
import { UserContext } from '../UserProvider/userProvider'
import { useNavigate } from 'react-router-dom'


export const AvatarChoice = () => {

    const [current, setCurrent] = useState('')
    const {avatar, setAvatar} = useContext(UserContext)
    const navigate = useNavigate()
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11, avatar12]

    const handleClick = (e: React.MouseEvent) => {
        e.currentTarget.classList.toggle('active')
        const src = e.currentTarget.getAttribute('src')
        setCurrent(src || '') 
   }

    const addAvatar = () => {
        setAvatar(current)
        navigate('/city-choice')

    }

    

    return ( 
        
        <div className='background' style={{backgroundImage:`url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>
            <div className="avatars-container">
                {avatars.map((avatar) => (
                    <img src={avatar} onClick={handleClick}></img>
                ))}
                
                <button className='Next-button' onClick={addAvatar}>Dalej</button>
            </div>
        </div>

     );
}
