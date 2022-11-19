import Popup from 'reactjs-popup';
import './PopUpAddCardsLink.style.css';
import { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase'

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
}

export const PopUpAddCardsLink: FC<PopUpProps> = ({note}) => {

    const navigate = useNavigate()
    const overlayStyle = {backdropFilter: "blur(5px)"}
    const [newCardsLink, setNewCardsLink] = useState('')


    const noteRef = doc (db, `Subjects`, note.Subject, 'Topics', note.Topic, 'Notes', `${note.ID}`) 

    const handleOnClick = async () => {
        const Cards = {
            Cards: newCardsLink
        }
        console.log(newCardsLink)
        console.log(note)
        await updateDoc(noteRef, {Cards})
        console.log('link dodany')
        navigate('/my-notes')
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
                    <span className="material-symbols-outlined close">close</span>
                    <div className='popup-title'>Jeszcze nic tu nie ma. Mozesz dodać nowy link.</div>
                    <form className='popup-form'>
                            <input className='popup-input' required></input>
                            <button className="popup-add-link-button" onClick={handleOnClick}>Dodaj link</button>
                    </form>
                </div>

    </Popup>
    </>
    )
}
  
