import { collection, doc, setDoc, getDocs, query, where, deleteDoc,  updateDoc } from "firebase/firestore";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import { Nav } from "../Nav/Nav";
import { ref } from "firebase/storage";

export const Note = () => {

    interface Obj {
        Author: string,
        ID: number,
        Note: string,
        Title: string,
    }
    const params = useParams();
    const subject = decodeURIComponent(window.location.href.split('/')[5]);
    const topic  = decodeURIComponent(window.location.href.split('/')[6]);
    const [note, setNote] = useState<Obj | any>();
    const [object, setObject] = useState([]);
    const [document, setDocument] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');
    const user = auth.currentUser;
    const navigate = useNavigate();
    
    
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
        const downloadData = async () => {
            if(!object.length){return}
            const notesRef = collection(db, `/Subjects/${subject}/Topics/${object}/Notes`);
            const q = query(notesRef, where("Note", "==", params.id))
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.forEach((doc) => {
                setNote(doc.data());
                setDocument(doc.id);
            })
        }
        downloadData();
    }, [object])


    const addToMyNotes = async () => {
        await setDoc(doc(db, `${user?.email}`, `${note.Note}`), {note})
        window.alert('notatka dodana do Twojej bazy')

    }
    
    const handleDelete = async () => {
        await deleteDoc(doc(db, `/Subjects/${subject}/Topics/${object}/Notes/${document}`))
        alert('Notatka została usunięta');
        navigate(`/subjects/${subject}/${topic}`)
    }

    const handleEdit = async () => {
        await updateDoc(doc(db, `/Subjects/${subject}/Topics/${object}/Notes/${document}`), {
            Note: newBody,
            Title: newTitle,
        })
        alert('Notatka została edytowana')
        navigate(`/subjects/${subject}/${topic}`);
    }
    
    return (


        
        <>
            <Nav/>
            <div>Notatka</div>
            <div>Autor notatki: {note?.Author}</div>
            <div>Tytuł notatki: {note?.Title}</div>
            <div>Treśc notatki: {note?.Note}</div>
            <button onClick={addToMyNotes}>Dodaj do moich notatek</button>
            {user?.email === note?.Author && (
                <div className="container">
                    <>
                        <button onClick={handleDelete}>Delte note</button>
                        <button onClick={() => setShowEdit(true)}>Edit note</button>
                    </>
                    {showEdit && (
                        <div className="edit-section">
                            <label htmlFor="title">Change title</label>
                            <input type="text" onChange={(e) => setNewTitle(e.target.value)}/>
                            <label htmlFor="title">Change body of the note</label>
                            <input type="text" onChange={(e) => setNewBody(e.target.value)}/>
                            <button onClick={handleEdit}>Kliknij żeby notatka została edytowana</button>
                        </div>
                    )}
                    
                </div>
                
            )}
            {user?.email === 'admin@gmail.com' && (
                <button onClick={handleDelete}>Delte note</button>
            )}
        </>
    )
}