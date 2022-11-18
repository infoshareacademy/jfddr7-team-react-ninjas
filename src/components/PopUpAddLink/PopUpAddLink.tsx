// import Popup from 'reactjs-popup';
// import '../PopUpAddLink/PopUpAddLink.style.css';



// const closeModal = () => {

// }

// export const PopUpAddLink = () => (
//     <>
//     <div className='blured'> 
//     <Popup trigger={
//         <button className='cards-button-no-cards'>
//             <span className="material-symbols-outlined">
//             school
//             </span>Fiszki</button>
//         } 
//         arrow={false}
//         modal={true}
//         closeOnEscape={true}
//         closeOnDocumentClick
//         >
//                 <div className='modal'>
//                 <span className="material-symbols-outlined close" onClick={closeModal}>close</span>
//                     <div className='popup-title'>Jeszcze nic tu nie ma. Mozesz dodać nowy link.</div>
//                     <form className='popup-form' onSubmit={addLink}>
//                         <input className='popup-input' required></input>
//                             <button type="submit" className="popup-add-link-button">Dodaj link</button>
//                     </form>
//                 </div>
//     </Popup>
//     </div>
//     </>
//   );

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';


export const PopUpAddLink = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () =>(
        // e.stopPropagation(),
        setShow(false)
    ) 

    const handleShow = (e:React.MouseEvent) => (
        e.stopPropagation(),
        setShow(true)
    )
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
