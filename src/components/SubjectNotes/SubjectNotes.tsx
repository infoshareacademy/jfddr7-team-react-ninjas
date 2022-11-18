import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebase";
import './SubjectNotes.style.css'
import { Nav } from '../Nav/Nav'


export const SubjectNotes = () => {
    const [newTopic, setNewTopic] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
    const [topicList, setTopicList] = useState([''])
    const [edit, setEdit] = useState(null);

   const addTopicToDb = () => {
    addDoc(collection(db, `/Subjects/${params.id}/Topics`), {
        Topic: newTopic,
    })
    setEdit(newTopic);
    navigate(`/subjects/${params.id}/`)
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
   
    
    return (
        <>
        <Nav/>
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
        </div>
        </>
    )
}