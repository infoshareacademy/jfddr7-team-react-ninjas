import { Nav } from '../Nav/Nav'
import '../MyNotes/MyNotes.style.css'
import { TabsSubjects } from '../TabsSubjects/TabsSubjects';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { SubjectNotes } from '../SubjectNotes/SubjectNotes';
import {Link} from 'react-router-dom';

interface MyNotesInterface{
    ID: number;
    Note: string;
    Topic: string;
    Author: string;
}

export const MyNotes = () => {

    const storage = getStorage();
    const notatkiRef = ref(storage, '/notatki.png')
    const user = auth.currentUser;
    const [url, setUrl] = useState('')
    const [myNotes, setMyNotes] = useState<MyNotesInterface[]>([])

    useEffect(() => {
        getDownloadURL(notatkiRef)
        .then((url)=> {
            setUrl(url)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [user])


    useEffect(()=> {
        getDocs(collection( db, `${user?.email}`))
        .then((querySnapshot) => {
            let items: MyNotesInterface[] = [];
            querySnapshot.docs.forEach((doc) => {
                let zmienna = doc.data() as MyNotesInterface
                items.push(zmienna)
            })
            setMyNotes(items)
        })
    },[])
   
    return ( 
        <div>
            <Nav/>
            {/* <TabsSubjects/> */}
            <div className='div-my-notes-container'>
                {/* {url !== '' && <div className='div-notes-card'><img src={url}></img></div>} */}
                {myNotes.map((note)=> (
                    <div key={note.ID}>
                        {/* <Link to={`/subjects/${subject}/${topic}/${note}`}> */}
                            {note.Author}
                            {/* </Link> */}
                    </div>
                 ))}
            </div>
        </div>

     );
}
 
