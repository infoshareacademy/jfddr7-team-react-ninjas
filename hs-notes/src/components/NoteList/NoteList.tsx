import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { db } from "../../firebase";
import { Nav } from "../Nav/Nav"

export const NoteList = () => {

    const params = useParams();
    console.log(params.id);
    console.log(window.location.href);
    const [note, setNote] = useState(['']);
    
    useEffect(() => {
        getDocs(collection(db, `/Subjects/Biologia/Topics/50Sjaik2II690AWB1bIf/Notes`)).then((querySnapshot) => {
            let topics: string[] = [];
             querySnapshot.forEach((doc) => {
                topics.push(doc.data().Note);
             })
             setNote(topics);
          })
        console.log(params.id);
          
       }, [])
    return (
        <>
            <Nav/>
            <div>Notatki z tematu: {params.id}</div>
            {note.map((note) => (
                <div>{note}</div>
            ))}
        </>
        
    )
}