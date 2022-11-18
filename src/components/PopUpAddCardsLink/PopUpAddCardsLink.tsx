import Popup from 'reactjs-popup';
import './PopUpAddCardsLink.style.css';
import { useState } from 'react';

const overlayStyle = {backdropFilter: "blur(5px)"}

export const PopUpAddCardsLink = () => (

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
                            <button className="popup-add-link-button">Dodaj link</button>
                    </form>
                </div>

    </Popup>
    </>
)
  
