import { collection, getDocs, query, where } from "firebase/firestore";
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
    const subject = decodeURIComponent(window.location.href.split('/')[4]);
    const topic  = decodeURIComponent(window.location.href.split('/')[5]);
    const [note, setNote] = useState<Obj | any>();
    const [object, setObject] = useState([]);
    
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
        getCurrentDoc(topic)        
        .then((data: any) => {
            setObject(data);
        })
    }, [])
    
    useEffect(() => {
        const downloadData = async () => {
            const notesRef = collection(db, `/Subjects/${subject}/Topics/${object}/Notes`);
            const q = query(notesRef, where("Note", "==", params.id))
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.forEach((doc) => {
                setNote(doc.data());
                console.log(doc.data());
            })
        }
        downloadData();
    }, [object])
    
    return (
        
        <>
            <Nav/>
            <div>Notatka</div>
            <div>Autor notatki: {note?.Author}</div>
            <div>Tytuł notatki: {note?.Title}</div>
            <div>Treśc notatki: {note?.Note}</div>
        </>
    )
}