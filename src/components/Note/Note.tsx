import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom"
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import { Nav } from "../Nav/Nav";

export const Note = () => {

    interface Obj {
        Title: string,
        Author: string,
        Note: string,
    }
    const params = useParams();
    const subject = decodeURIComponent(window.location.href.split('/')[5]);
    const topic  = decodeURIComponent(window.location.href.split('/')[6]);
    const [note, setNote] = useState<Obj | any>();
    const [object, setObject] = useState([]);
    const user = auth.currentUser;
    
    
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
            const notesRef = collection(db, `/Subjects/${subject}/Topics/${object}/Notes`);
            const q = query(notesRef, where("Note", "==", params.id))
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.forEach((doc) => {
                setNote(doc.data());
            })
        }
        downloadData();
    }, [object])


    const addToMyNotes = async () => {
        await setDoc(doc(db, `${user?.email}`, `${note.Note}`), {note})
        window.alert('notatka dodana do Twojej bazy')

    }
    
    const handleDelete = () => {
        console.log('Delete note');
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
                <button onClick={handleDelete}>Delte note</button>
            )}
        </>
    )
}