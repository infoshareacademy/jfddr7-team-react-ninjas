import Popup from 'reactjs-popup';
import './PopUpAddQuizLink.style.css';
import { useState, FC, Dispatch, SetStateAction, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {doc, Firestore, setDoc, collection, updateDoc} from 'firebase/firestore';
import { db } from '../../firebase';
import { UserContext } from '../UserProvider/userProvider';

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
    setIsLinkUpdated:  Dispatch<SetStateAction<boolean>>
}


export const PopUpAddQuizLink: FC<PopUpProps> = ({note, setIsLinkUpdated}) => {

    const navigate = useNavigate()
    const overlayStyle = {backdropFilter: "blur(5px)"}
    const [newQuizLink, setNewQuizLink] = useState('')
    const [isLinkAdded, setIsLinkAdded] =  useState(false)
    const {email} = useContext(UserContext)
    

    const Quiz = `${newQuizLink}`


    const noteRef = doc (db, `Subjects`, note.Subject, 'Topics', note.Topic, 'Notes', `${note.ID}`,)
    const userNoteRef = doc (db, `${email}notes`, `${note.ID}`)
    
    const handleSubmit = async () => {
        await updateDoc(noteRef, {Quiz})
        await updateDoc(userNoteRef, {Quiz})
        setIsLinkAdded(true)
        setIsLinkUpdated(current => !current)
    }


return(
    <>
    <Popup trigger={
        <div className='quiz-button-no-cards'>
            <span className="material-symbols-outlined">
            quiz
            </span>
            Quiz
        </div>
        } 
        {...{overlayStyle}}
        modal
        closeOnDocumentClick
        arrow={false}
        >  
                <div className='modal'>
                    {!isLinkAdded && <div className='popup-title'>Jeszcze nic tu nie ma. Mozesz dodać nowy link.</div>}
                    {isLinkAdded && <div className='popup-title-ready'>Gotowe!</div> }
                    <form className='popup-form' onSubmit={handleSubmit}>
                            <input className='popup-input' required onChange={(e)=>setNewQuizLink(e.target.value)}></input>
                            <button type="submit" className="popup-add-link-button">Dodaj link</button>
                    </form>
                </div>

    </Popup>
    </>
)
}
  
