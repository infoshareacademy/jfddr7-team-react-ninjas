import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom"
import { db } from "../../firebase";
import { useEffect, useState } from "react";

export const Note = () => {
    const params = useParams();
    const subject = window.location.href.split('/')[4];
    const topic  = window.location.href.split('/')[5];
    const [note, setNote] = useState({});
    const [object, setObject] = useState([]);
    console.log(subject);
    console.log(topic);
    console.log(params.id);

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
        .then((data: any) => setObject(data))
    }, [])
    
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
        console.log('useEffect');
        
        
    }, [object])
    
    
    
    
    

    return (
        <>
            <div>Notatka : {params.id}</div>
            {/* <div>{note[Author]}</div>
            <div>{note[Title]}</div>
            <div>{note[Note]}</div> */}

            
        </>
    )
}