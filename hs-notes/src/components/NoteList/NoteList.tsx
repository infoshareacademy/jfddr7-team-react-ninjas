import { collection, collectionGroup, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { db } from "../../firebase";
import { Nav } from "../Nav/Nav"

export const NoteList = () => {

    const params = useParams();
    console.log(params.id);
    const subject = window.location.href.split('/')[4];
    console.log(window.location.href.split('/')[4]);
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
            
                console.log(obj)
                console.log(typeof obj[n]);
                
                return obj[n];
                 
    }

    useEffect(() => {
        getCurrentDoc(params.id)
        .then((data: any) => setObject(data))
        console.log(object);
    }, [])
    console.log(object);
    
    
    useEffect(() => {
        const downloadData = async () => {
            let notes: string[] = [];
            const querySnapshot = await getDocs(collection(db, `/Subjects/${subject}/Topics/${object}/Notes`));
            querySnapshot.docs.forEach((doc) => {
                notes.push(doc.data().Note);
            })
    
             setNote(notes);
            console.log(params.id);
        }
        downloadData();
        console.log('useEffect');
        
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