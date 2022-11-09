import {FormEventHandler, useState} from 'react';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '../../firebase'


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
        <form onSubmit={addNewSubject}>
            <label htmlFor="add-subject-input">Nazwa przedmiotu:</label>
            <input id="add-subject-input" type="text" placeholder="Matematyka" onChange={(e)=> setNewSubject(e.target.value)}/>
            <button>Dodaj przedmiot</button>
        </form>
     );
}

