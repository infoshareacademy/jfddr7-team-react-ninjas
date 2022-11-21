import { Nav } from '../Nav/Nav'
import '../MyNotes/MyNotes.style.css'
import { TabsSubjects } from '../TabsSubjects/TabsSubjects';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import {useNavigate} from 'react-router-dom';
import like from '../../img/like.png' 
import bin from '../../img/bin.png'
import takingNotes from '../../img/takingNotes2.png'
import {PopUpAddQuizLink} from '../PopUpAddQuizLink/PopUpAddQuizLink';
import {PopUpAddCardsLink} from '../PopUpAddCardsLink/PopUpAddCardsLink';


interface MyNotesInterface{
    Author: string;
    Cards: string;
    ID: number;
    Note: string;
    Ranking: number;
    Subject: string;
    Title: string;
    Topic: string;
    Quiz: string;
}

export const MyNotes = () => {

    const storage = getStorage();
    const notatkiRef = ref(storage, '/notatki.png')
    const user = auth.currentUser;
    const [url, setUrl] = useState('')
    const [myNotes, setMyNotes] = useState<MyNotesInterface[]>([])
    const [noteToBeDeleted, setNoteToBeDeleted] = useState('')
    const navigate = useNavigate();
    const [isLinkUpdated, setIsLinkUpdated] = useState(false)

    // useEffect(() => {
    //     getDownloadURL(notatkiRef)
    //     .then((url)=> {
    //         setUrl(url)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }, [user])


    useEffect(()=> {
        getDocs(collection( db, `${user?.email}notes`))
        .then((querySnapshot) => {
            let myNotes: MyNotesInterface[] = [];
            querySnapshot.docs.forEach((doc) => {
                let noteObject = doc.data() as MyNotesInterface
                console.log(noteObject)
                myNotes.push(noteObject)
            })
            setMyNotes(myNotes)
        })
    },[noteToBeDeleted, isLinkUpdated])


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
                        navigate(`/subjects/${note.Subject}/${note.Topic}/${note.Title}`)
                    )
                }
                    >
                        <div className='note-details'>
                            <div className='topic'>{note.Title}</div>
                            <div className='author'>Autor: {note.Author}</div>
                            <div className='ranking'>{note.Ranking} <img className="like-img" src={like}></img></div>
                        </div>
                        <div className='note-buttons'>

                            {note.Cards !== '' && 
                            
                            <button 
                                    className='cards-button'
                                    onClick={(event)=>(
                                        event.stopPropagation(),
                                        console.log(note.Cards),
                                        window.open(note.Cards, '_blank', 'noopener, noreferrer')
                                    )}
                            >
                                <span className="material-symbols-outlined">
                                school
                                </span>

                                Fiszki
                            </button> }

                            {note.Cards == '' &&
                            <PopUpAddCardsLink note={note} setIsLinkUpdated={setIsLinkUpdated}/> 
                            }
                            
                            {note.Quiz !== '' &&
                            <button 
                                    className='quiz-button' 
                                    onClick={(event)=> (
                                        event.stopPropagation(),
                                        window.open(note.Quiz, '_blank', 'noopener, noreferrer')
                                    )}
                            >
                                <span className="material-symbols-outlined">
                                quiz
                                </span>
                                Quiz
                            </button>
                            }

                            {note.Quiz == '' && 
                            <PopUpAddQuizLink note={note} setIsLinkUpdated={setIsLinkUpdated}/>
                            }

                            <button 
                                    className='remove-note-button' 
                                    onClick={async (event) => (
                                        event.stopPropagation(),
                                        await deleteDoc(doc(db, `${user?.email}notes`, `${note.ID}`)), 
                                        setNoteToBeDeleted(note.Note)
                                    )}
                            >
                            <img className="bin-img" src={bin}></img>
                            </button>

                        </div>
                    </div>
                 ))}
            </div>

            <div className='my-notes-picture' style={{backgroundImage:`url(${takingNotes})`}}></div>
        </div>
        </>

     );
}
 
