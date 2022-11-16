import { Nav } from '../Nav/Nav'
import '../MyNotes/MyNotes.style.css'
import { TabsSubjects } from '../TabsSubjects/TabsSubjects';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { SubjectNotes } from '../SubjectNotes/SubjectNotes';
import {Link, useNavigate} from 'react-router-dom';

interface MyNotesInterface{
    Author: string;
    ID: number;
    Note: string;
    Ranking: 0;
    Subject: string;
    Title: string;
    Topic: string;
}

export const MyNotes = () => {

    const storage = getStorage();
    const notatkiRef = ref(storage, '/notatki.png')
    const user = auth.currentUser;
    const [url, setUrl] = useState('')
    const [myNotes, setMyNotes] = useState<MyNotesInterface[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        getDownloadURL(notatkiRef)
        .then((url)=> {
            setUrl(url)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [user])


    useEffect(()=> {
        getDocs(collection( db, `${user?.email}`))
        .then((querySnapshot) => {
            let myNotes: MyNotesInterface[] = [];
            querySnapshot.docs.forEach((doc) => {
                let noteObject = doc.data().note as MyNotesInterface
                console.log(noteObject)
                myNotes.push(noteObject)
                setMyNotes(myNotes)
            })
        })
    },[])

    const removeFromMyNotes = () => {

    }

   
    return ( 
        <div>
            <Nav/>
            {/* <TabsSubjects/> */}
            <div className='div-my-notes-container'>
                {/* {url !== '' && <div className='div-notes-card'><img src={url}></img></div>} */}
                {myNotes && myNotes.map((note)=> (
                    <div key={note.ID} className="div-notes-card" onClick={()=>navigate(`/subjects/${note.Subject}/${note.Topic}/${note}`)}>
                        <div className='note-details'>
                            <div className='topic'>Temat: {note.Note}</div>
                            <div>Autor: {note.Author}</div>
                            <div>Liczba polubień:{note.Ranking}</div>
                        </div>
                        <div className='note-buttons'>
                            <button>Przeglądaj fiszki</button>
                            <button>Zrób test</button>
                            <button className='remove-note-button' onClick={removeFromMyNotes}>Usuń z moich notatek</button>
                        </div>
                    </div>
                 ))}
            </div>
        </div>

     );
}
 
