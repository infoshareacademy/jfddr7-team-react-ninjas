import { addDoc, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebase";
import './SubjectNotes.style.css'
import { Nav } from '../Nav/Nav'
import image from '../../img/takingNotes.png'


export const SubjectNotes = () => {
    const [newTopic, setNewTopic] = useState(null);
    const params = useParams();
    const navigate = useNavigate()
    const [topicList, setTopicList] = useState([''])
    const [edit, setEdit] = useState(null);


const noteRef = doc(db, `Subjects/${params.id}/Topics`, `${newTopic}`)

const addTopicToDb = () => {
    setDoc(noteRef, {
        Topic: newTopic,
    })
    setEdit(newTopic)
    navigate(`/subjects/${params.id}`)
}


   useEffect(() => {
    getDocs(collection(db, `/Subjects/${params.id}/Topics`)).then((querySnapshot) => {
        let topics: string[] = [];
         querySnapshot.forEach((doc) => {
            topics.push(doc.data().Topic);
         })
        setTopicList(topics);
      })
   }, [edit])

   const navToSubject = () => {
    navigate("/subjects")
   }
   
    
    return (
        <>
        <Nav/>
    <div className="subject-notes-conatiner">
        <div className="subjectNotes">
            <h1>{params.id}</h1>
            <div className="newTopicPanel">
             <label htmlFor="newTopic">Dodaj nowy temat</label>
             <input type="text" placeholder="Wpisz temat ..." onChange={(e: any) => setNewTopic(e.target.value)}/>
             <button onClick={addTopicToDb}>Dodaj nowy temat</button>
            </div>
            <div className="topic-list">
                {topicList.map((item, number) => (
                    <div className="one-topic" key={number}><Link className='link' to={`/subjects/${params.id}/${item}`}> {item} </Link></div>
                    ))}
            </div> 
            <div className="div-for-gt-btn"><button onClick={navToSubject} className="btn-go-to-subject">Wróć do poprzedniej strony</button></div>

        </div>
        <div className="empty-space" style={{backgroundImage:`url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}></div>
    </div>
        </>
    )
}