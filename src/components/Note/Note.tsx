import { collection, doc, setDoc, getDocs, query, where, deleteDoc,  updateDoc, addDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom"
import { auth, db } from "../../firebase";
import { Key, useEffect, useState } from "react";
import { Nav } from "../Nav/Nav";
import './Note.style.css'


export const Note = () => {

    interface Obj {
        Author: string,
        ID: number,
        Note: string,
        Title: string,
    }

    interface CommentData {
        Author: string,
        Body: string,
        Date: number,
    }
    const params = useParams();
    let subject = decodeURIComponent(window.location.href.split('/')[5]);
    let topic  = decodeURIComponent(window.location.href.split('/')[6]);
    const [note, setNote] = useState<Obj | any>();
    const [object, setObject] = useState([]);
    const [document, setDocument] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');
    const [ranking, setRanking] = useState<string | any>();
    const [comment ,setComment] = useState('');
    const [commentList, setCommentList] = useState<string | any>([]);
    const [date, setDate] = useState<any>();
    const [allComments, setAllComments] = useState<CommentData | any>();
    const [renderComment, setRenderComment] = useState('')
    const user = auth.currentUser;
    const navigate = useNavigate();
    const array = window.location.href.split('/');
    // console.log(array);

    if (array.length === 8) {
        subject = decodeURIComponent(window.location.href.split('/')[5]);
        topic  = decodeURIComponent(window.location.href.split('/')[6]);
   } else if (array.length === 9) {
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
        getCurrentDoc(topic)        
        .then((data: any) => {
            setObject(data);
        })
    }, [])
    
    //W tym useEffecie pobieramy dane z bazy danych, przy parametrach, które ustaliła wcześniejsza funkcja.
    useEffect(() => {
        const downloadNote = async () => {
            // if(!object.length){return}
            const notesRef = collection(db, `/Subjects/${subject}/Topics/${object}/Notes`);
            const q = query(notesRef, where("Title", "==", params.id))
            const querySnapshot = await getDocs(q);
            
            querySnapshot.docs.forEach((doc) => {
                setNote(doc.data());
                setDocument(doc.id);
                const timeStamp = note?.ID;
                const data = new Date(timeStamp);
                const dateFormat = data.getHours() + ":" + data.getMinutes() + ", "+ data.toDateString();
                setDate(dateFormat)
                console.log(dateFormat);
                
            })
        }
        //Ta funkcja w useEffecie pobiera komentarze
        const downloadComments = async () => {
            let comments: string[] = [];
            let authors: string[] = [];
            let dates: string[] = [];
            // if(!object.length){return}
            const querySnapshot = await getDocs(collection(db, `/Subjects/${subject}/Topics/${object}/Notes/${document}/Comments`));
            querySnapshot.docs.forEach((doc) => {
                comments.push(doc.data().Body);
                authors.push(doc.data().Author);
                dates.push(doc.data().Date);
                setAllComments(doc.data());
                
            })
            setCommentList(comments);
        }
        downloadNote();
        downloadComments();
    }, [object, document, renderComment])

    //Funkcja, która dodaje notatkę do notatek użytkownika
    const addToMyNotes = async () => {
        await setDoc(doc(db, `${user?.email}notes`, `${note.ID}`), {note})
        window.alert('notatka dodana do Twojej bazy')
    }
    
    //Funkcja która pozwala na usuwanie notatek tylko ich właścicielowi, wyłącznie admin może usunąć każdą notatkę
    const handleDelete = async () => {
        await deleteDoc(doc(db, `/Subjects/${subject}/Topics/${object}/Notes/${document}`))
        alert('Notatka została usunięta');
        navigate(`/subjects/${subject}/${topic}`)
    }

    //Funkcja, która pozwala na edytowanie notatki uzytkownikowi, który ją stworzył
    const handleEdit = async () => {
        await updateDoc(doc(db, `/Subjects/${subject}/Topics/${object}/Notes/${document}`), {
            Note: newBody,
            Title: newTitle,
        })
        alert('Notatka została edytowana')
        navigate(`/subjects/${subject}/${topic}`);
    }

    //Funkcja, która na wciśniecie plusa zwiększa ranking notatki
    const handleRanking = async () => {
        await setRanking(note.Ranking + 1);
        await updateDoc(doc(db, `/Subjects/${subject}/Topics/${object}/Notes/${document}`), {
            Ranking: note.Ranking + 1,
        })
    }

    //Funkcja, która dodaje komentarz
    const addCommentHandler = () => {
        console.log(comment);
        addDoc(collection(db, `/Subjects/${subject}/Topics/${object}/Notes/${document}/Comments`), {
            Date: new Date(). getTime(),
            Body: comment,
            Author: auth.currentUser?.displayName,
        })
        setRenderComment(comment);
        navigate(`/subjects/${subject}/${topic}/${params.id}`)
    }

    const isEdited = () => {
        if (showEdit === true) {
            setShowEdit(false);
        } else {
            setShowEdit(true);
        }
    }
    
    return (
        <>
            <Nav/>
            <div className="note-container">
                <div className="note-info">
                    <div className="author-date">
                        <div>Stworzona przez: {note?.Author}</div>
                        <div>w dniu {date}</div>
                    </div>
                    <div className="ranking">
                        <div>
                            {ranking && (
                                <div className="plus">
                                    <button onClick={handleRanking}>+</button>
                                    <span>{ranking}</span>
                                </div>
                            )}
                            {!ranking && (
                                <div className="plus">
                                    <button onClick={handleRanking}>+</button>
                                    <span>{note?.Ranking}</span>
                                </div>
                            )}
                    </div>
                </div>
            </div>
            <hr />
                <div className="title">{note?.Title}</div>
                <article>{note?.Note}</article>
                <div className="button-section">
                    <button className="add-btn" onClick={addToMyNotes}>Dodaj do moich notatek</button>
                    {user?.displayName === note?.Author && (
                        <div className="edit-and-delete-btn">
                            <>
                                <button className="del-btn" onClick={handleDelete}>Usuń notatkę</button>
                                <button className="edit-btn" onClick={isEdited}>Edytuj notatkę</button>
                            </>
                        </div>
                    )}
                    {user?.displayName === 'admin@gmail.com' && (
                        <button onClick={handleDelete}>Delte note</button>
                    )}
                    </div>
                    {showEdit && (
                                <div className="edit-section">
                                    <div className="edit-title">
                                        <label htmlFor="title">Zmień tytuł notatki</label>
                                        <input type="text" onChange={(e) => setNewTitle(e.target.value)}/>
                                    </div>
                                    <div className="edit-body">
                                        <label htmlFor="body">Zmień treść notatki</label>
                                        <input type="text" onChange={(e) => setNewBody(e.target.value)}/>
                                    </div>
                                    <button onClick={handleEdit}>Kliknij żeby notatka została edytowana</button>
                                </div>
                            )}
                <div className="comment-section">
                    <hr />
                    <h1>Sekcja komentarzy</h1>
                        <div className="comments">
                            {commentList.map((comment: string, number: Key) => (
                                <div className="comment">
                                    <div className="comment-info">
                                        <span>Autor: {note?.Author} w dniu {date}</span>
                                    </div>
                                    <div className="comment-body" key={number}>{comment}</div>
                                </div>
                            ))}
                        </div>
                        <>
                            <label htmlFor="comment">Treść komentarza: </label>
                            <input type="text" onChange={(e) => setComment(e.target.value)}/>
                            <button onClick={addCommentHandler}>Dodaj Komentarz</button>
                        </>

                </div>
            </div>
        </>
    )
}