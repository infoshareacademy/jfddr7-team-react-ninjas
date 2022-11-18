import Popup from 'reactjs-popup';
import './PopUpAddQuizLink.style.css';
import { useState } from 'react';

const overlayStyle = {backdropFilter: "blur(5px)"}

export const PopUpAddQuizLink = () => (

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
                    <form className='popup-form'>
                            <input className='popup-input' required></input>
                            <button className="popup-add-link-button">Dodaj link</button>
                    </form>
                </div>

    </Popup>
    </>
)
  
