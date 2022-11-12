import { Nav } from '../Nav/Nav'
import '../MyNotes/MyNotes.style.css'
import { TabsSubjects } from '../TabsSubjects/TabsSubjects';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
export const MyNotes = () => {

    const storage = getStorage();
    const notatkiRef = ref(storage, '/notatki.png')

    const [url, setUrl] = useState('')

    useEffect(() => {
        getDownloadURL(notatkiRef)
        .then((url)=> {
            setUrl(url)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])
   

    return ( 
        <div>
            <Nav/>
            <TabsSubjects/>
            <div className='div-my-notes-container'>
                {url !== '' && <div className='div-notes-card'><img src={url}></img></div>}
            </div>
        </div>

     );
}
 