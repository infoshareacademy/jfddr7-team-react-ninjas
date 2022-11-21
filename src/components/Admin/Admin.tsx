import {FormEventHandler, useState} from 'react';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '../../firebase'
import './Admin.style.css';
import {useNavigate} from 'react-router-dom';
import { Nav } from '../Nav/Nav' 


export const Admin = () => {

    const [newSubject, setNewSubject] = useState('')
    const navigate = useNavigate()

    const addNewSubject: FormEventHandler = async (e: React.FormEvent<HTMLInputElement>) :Promise<void> => {
        e.preventDefault();
        try{
            await setDoc(doc(db, 'Subjects', newSubject), {
                        Subject: newSubject
            })
        } catch(error){console.log(error)}
        navigate('/subjects')
    }

    return ( 
        <>
        <Nav/>
            <form onSubmit={addNewSubject}>
                <label className='admin-label' htmlFor="add-subject-input">Nazwa przedmiotu:</label>
                <input className='add-subject-input' type="text" placeholder="Matematyka" onChange={(e)=> setNewSubject(e.target.value)}/>
                <button className='add-subject-button'>Dodaj przedmiot</button>
            </form>
        </>
     );
    
}

