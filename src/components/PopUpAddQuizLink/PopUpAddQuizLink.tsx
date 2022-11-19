import Popup from 'reactjs-popup';
import './PopUpAddQuizLink.style.css';
import { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {doc, Firestore, setDoc, collection, updateDoc} from 'firebase/firestore';
import { db } from '../../firebase';

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
}


export const PopUpAddQuizLink: FC<PopUpProps> = ({note}) => {

    const navigate = useNavigate()
    const overlayStyle = {backdropFilter: "blur(5px)"}
    const [newQuizLink, setNewQuizLink] = useState('')

    const Quiz = {
        Quiz: `${newQuizLink}`
    }


    const noteRef = doc (db, `Subjects`, note.Subject, 'Topics', note.Topic, 'Notes', `${note.ID}`)
    
    const handleSubmit = async () => {
        console.log(newQuizLink)
        console.log(note)
        await updateDoc(noteRef, {Quiz})
        console.log(note)
        console.log('link dodany')
        navigate('/my-notes')
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
        closeOnEscape
        closeOnDocumentClick
        arrow={false}
        >
                <div className='modal'>
                    <span className="material-symbols-outlined close">close</span>
                    <div className='popup-title'>Jeszcze nic tu nie ma. Mozesz dodać nowy link.</div>
                    <form className='popup-form' onSubmit={handleSubmit}>
                            <input className='popup-input' required onChange={(e)=>setNewQuizLink(e.target.value)}></input>
                            <button type="submit" className="popup-add-link-button">Dodaj link</button>
                    </form>
                </div>

    </Popup>
    </>
)
}
  
