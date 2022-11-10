import {FormEventHandler, useState} from 'react';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '../../firebase'
import './Admin.style.css';


export const Admin = () => {

    const [newSubject, setNewSubject] = useState('')

    const addNewSubject: FormEventHandler = async (e: React.FormEvent<HTMLInputElement>) :Promise<void> => {
        e.preventDefault();
        try{
            await setDoc(doc(db, 'Subjects', newSubject), {
                        Subject: newSubject
            })
        } catch(error){console.log(error)}
    }

    return ( 
        <div className='admin-div'>
            <div className='admin-h1-div'>
                <h1 className='admin-h1'>Panel Administratora</h1>
            </div>
            <form onSubmit={addNewSubject}>
                <label className='admin-label' htmlFor="add-subject-input">Nazwa przedmiotu:</label>
                <input className='add-subject-input' type="text" placeholder="Matematyka" onChange={(e)=> setNewSubject(e.target.value)}/>
                <button className='admin-botton'>Dodaj przedmiot</button>
            </form>
        </div>
     );
}

