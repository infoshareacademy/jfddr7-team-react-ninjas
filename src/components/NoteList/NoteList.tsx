import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { auth, db } from "../../firebase";
import { Nav } from "../Nav/Nav"
import './NoteList.styles.css'

export const NoteList = () => {

    const params = useParams();
    let subject = decodeURIComponent(window.location.href.split('/')[5]);
    let topic  = decodeURIComponent(window.location.href.split('/')[6]);
    const [note, setNote] = useState(['']);
    const [object, setObject] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [showAddInput, setShowAddInput] = useState(false);
    const array = window.location.href.split('/');
    console.log(array);

    if (array.length == 7) {
         subject = decodeURIComponent(window.location.href.split('/')[5]);
         topic  = decodeURIComponent(window.location.href.split('/')[6]);
    } else if (array.length == 8) {
        subject = decodeURIComponent(window.location.href.split('/')[6]);
         topic  = decodeURIComponent(window.location.href.split('/')[7]);
    }
    
    // funkcja, która pobierze obiekt, łączący przedmioty razem z nazwami poszczególnych dokumentów: 
    //obj = {Biologia: asudausbdubasdasd, Matematyka: asdasdasd}
    const getCurrentDoc = async (n: any)  => {
        const obj: object | any = {};
        let topics: any = [];
        let ids: any = [];
        const querySnapshot = await getDocs(collection(db, `/Subjects/${subject}/Topics`));
        querySnapshot.docs.forEach((doc) => {
                    ids.push(doc.id);
                    topics.push(doc.data().Topic)
                })
                
                topics.forEach((element:any, index: any) => {
                    obj[element] = ids[index];
                });
            return obj[n];

    }
    //useEffect używa funkcji i w obiekcie szuka id dokumentu, który będzie pobierany
    useEffect(() => {
        getCurrentDoc(params.id)
        .then((data: any) => setObject(data))
    }, [])
    
    //Dzięki użyciu f. getCurrentDoc możemy pobrać numer dokumentu -> {object}, który jest parametrem querry do bazy danych
    useEffect(() => {
        const downloadData = async () => {
            let notes: string[] = [];
            // console.log(subject, object)
            if(!object.length){return}
            const querySnapshot = await getDocs(collection(db, `/Subjects/${subject}/Topics/${object}/Notes`));
            querySnapshot.docs.forEach((doc) => {
                notes.push(doc.data().Title);
            })
             setNote(notes);
        }
        downloadData();
       }, [object])

       //Funkcja, która dodaj notatkę do bazy danych
       const addNoteToDb = () => {
        addDoc(collection(db, `/Subjects/${subject}/Topics/${object}/Notes`), {
            ID: new Date(). getTime(),
            Note: newNote,
            Title: newTitle,
            Author: auth.currentUser?.displayName,
            Topic: topic,
            Subject: subject,
            Ranking: 0,
        })
        console.log('Notatka została dodana do bazy danych...');
        setShowAddInput(false);
       }

       const showInputHandler = () => {
        if (showAddInput === false) {
            setShowAddInput(true);
        } else {
            setShowAddInput(false)
        }
       }

    return (
        <>
            <Nav/>
            <div className="note-list-container">
                <div className="title">Notatki z tematu: {params.id}</div>
                <div className="add-note">
                <button onClick={showInputHandler}>Kliknij aby dodać nową notatkę</button>
                </div>
                <div className="add-note-panel">
                    {showAddInput && (
                        <>
                        <hr />
                            <h1>Dodaj nową notatkę</h1>
                            <div className="add-title">
                                <label htmlFor="title">Tytuł notatki</label>
                                <input type="text" onChange={(e) => setNewTitle(e.target.value)}/>
                            </div>
                            <div className="add-body">
                                <label htmlFor="body">Treść Notatki</label>
                                <input type="textarea" className='text-area' onChange={(e) => setNewNote(e.target.value)}/>
                            </div>
                            <button onClick={addNoteToDb}>Dodaj notatkę</button>
                        </>
                    )}
                </div>
                <hr />
                <div className="notes-section">
                    {note.map((note, number) => (
                        <Link className='subject-link' to={`/subjects/${subject}/${topic}/${note}`}>
                            <div className="note">
                                <div className="note-title" key={number}> {note} </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
        
    )
}