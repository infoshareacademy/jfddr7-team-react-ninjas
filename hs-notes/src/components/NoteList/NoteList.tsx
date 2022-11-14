import { collection, collectionGroup, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { db } from "../../firebase";
import { Nav } from "../Nav/Nav"

export const NoteList = () => {

    const params = useParams();
    const subject = window.location.href.split('/')[4];
    const [note, setNote] = useState(['']);
    const [object, setObject] = useState([])

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

    useEffect(() => {
        getCurrentDoc(params.id)
        .then((data: any) => setObject(data))
    }, [])

    
    
    useEffect(() => {
        const downloadData = async () => {
            let notes: string[] = [];
            const querySnapshot = await getDocs(collection(db, `/Subjects/${subject}/Topics/${object}/Notes`));
            querySnapshot.docs.forEach((doc) => {
                notes.push(doc.data().Note);
            })
             setNote(notes);
        }
        downloadData();
       }, [object])


    return (
        <>
            <Nav/>
            <div>Notatki z tematu: {params.id}</div>
            {note.map((note, number) => (
                <div key={number}>{note}</div>
            ))}
        </>
        
    )
}