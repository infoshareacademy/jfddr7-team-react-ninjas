import Popup from 'reactjs-popup';
import './PopUpAddCardsLink.style.css';
import { useState, FC, Dispatch, SetStateAction, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase'
import { UserContext } from '../UserProvider/userProvider'

const overlayStyle = {backdropFilter: "blur(5px)"}

interface PopUpProps{
    note: {
        Author: string;
        Cards: string;
        ID: number;
        Note: string;
        Ranking: number;
        Subject: string;
        Title: string;
        Topic: string;
        Quiz: string;
    };
    setIsLinkUpdated: Dispatch<SetStateAction<boolean>>;
}

export const PopUpAddCardsLink: FC<PopUpProps> = ({note, setIsLinkUpdated}) => {

    const navigate = useNavigate()
    const overlayStyle = {backdropFilter: "blur(5px)"}
    const [newCardsLink, setNewCardsLink] = useState('')
    const [isLinkAdded, setIsLinkAdded] =  useState(false)
    const {email} = useContext(UserContext)


    const Cards = `${newCardsLink}`


    const noteRef = doc (db, `Subjects`, note.Subject, 'Topics', note.Topic, 'Notes', `${note.ID}`)
    const userNoteRef = doc (db, `${email}notes`, `${note.ID}`)


    const handleOnClick = async () => {
        await updateDoc(noteRef, {Cards})
        await updateDoc(userNoteRef, {Cards})
        setIsLinkAdded(true)
        setIsLinkUpdated(current => !current)
    }

    return(
            <>
            <Popup trigger={
                <button className='cards-button-no-cards'>
                    <span className="material-symbols-outlined">
                    school
                    </span>Fiszki</button>
                } 
                {...{overlayStyle}}
                modal
                closeOnEscape
                closeOnDocumentClick
                arrow={false}
                >
                        <div className='modal'>
                            {!isLinkAdded && <div className='popup-title'>Jeszcze nic tu nie ma. Mozesz dodać nowy link.</div>}
                            {isLinkAdded && <div className='popup-title-ready'>Gotowe!</div>}
        
                            <form className='popup-form'>
                                    <input className='popup-input' required onChange={(e)=> setNewCardsLink(e.target.value)}></input>
                                    <button className="popup-add-link-button" onClick={handleOnClick}>Dodaj link</button>
                            </form>
                        </div>

            </Popup>
            </>
    
    )
}

  
