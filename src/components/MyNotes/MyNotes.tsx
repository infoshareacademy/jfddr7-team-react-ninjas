import { Nav } from '../Nav/Nav'
import '../MyNotes/MyNotes.style.css'
import { TabsSubjects } from '../TabsSubjects/TabsSubjects';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { SubjectNotes } from '../SubjectNotes/SubjectNotes';
import {Link, useNavigate} from 'react-router-dom';
import like from '../../img/like.png' 
import bin from '../../img/bin.png'
import cards from '../../img/learn.png'
import quiz from '../../img/quiz.png'
import takingNotes from '../../img/takingNotes2.png'



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
    const [noteToBeDeleted, setNoteToBeDeleted] = useState('')
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
        getDocs(collection( db, `${user?.email}notes`))
        .then((querySnapshot) => {
            let myNotes: MyNotesInterface[] = [];
            querySnapshot.docs.forEach((doc) => {
                let noteObject = doc.data().note as MyNotesInterface
                myNotes.push(noteObject)
            })
            setMyNotes(myNotes)
        })
    },[noteToBeDeleted])


    return ( 
        <>
        <Nav/>
        <div className='wrapper'>
           
            {/* <TabsSubjects/> */}
            <div className='div-my-notes-container'>
                {/* {url !== '' && <div className='div-notes-card'><img src={url}></img></div>} */}
                {myNotes && myNotes.map((note)=> (
                    <div key={note.ID} className="div-notes-card" 
                    onClick={(event)=> (
                        navigate(`/subjects/${note.Subject}/${note.Topic}/${note.Note}`)
                    )
                }
                    >
                        <div className='note-details'>
                            <div className='topic'>{note.Note}</div>
                            <div className='author'>Autor: {note.Author}</div>
                            <div className='ranking'>{note.Ranking} <img className="like-img" src={like}></img></div>
                        </div>
                        <div className='note-buttons'>
                            <button className='cards-button'><img src={cards}></img>Fiszki</button>
                            <button className='quiz-button'><img src={quiz}></img>Quiz</button>
                            <button className='remove-note-button' 
                                    onClick={async (event) => (
                                        event.stopPropagation(),
                                        await deleteDoc(doc(db, `${user?.email}`, `${note.Note}`)), 
                                        setNoteToBeDeleted(note?.Note)
                                    )}
                            ><img className="bin-img" src={bin}></img></button>
                        </div>
                    </div>
                 ))}
            </div>

            <div className='my-notes-picture' style={{backgroundImage:`url(${takingNotes})`}}></div>
        </div>
        </>

     );
}
 
