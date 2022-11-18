import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebase";
import './SubjectNotes.style.css'
import { Nav } from '../Nav/Nav'
import image from '../../img/takingNotes.png'

// //map zamiast forEach

export const SubjectNotes = () => {
    const [subjectsObject, setSubjectObject] = useState([]);
    const [newTopic, setNewTopic] = useState(null);
    const params = useParams();
    const navigate = useNavigate()
    
    const [topicList, setTopicList] = useState([''])

//     const paramsGetter: any = useCallback( async (n: any) => {
//         const obj: object | any = {};
//         const querySnapshot = await getDocs(collection(db, 'Subjects'));
//         let subjects: any = [];
//         let ids: any = [];
//         querySnapshot.docs.forEach((doc) => {
//             ids.push(doc.id);
//             subjects.push(doc.data().Subject)
//         })
//         subjects.forEach((element:any, index: any) => {
//             obj[element] = ids[index];
//         });
//         return obj[n];
//    }, []);

   const addTopicToDb = () => {
    addDoc(collection(db, `/Subjects/${params.id}/Topics`), {
        Topic: newTopic,
    })
   }

    // useEffect(() => {
    //     paramsGetter(params.id)
    //     .then((data: any) => setSubjectObject(data))
    // }, [params.id, paramsGetter])


   useEffect(() => {
    getDocs(collection(db, `/Subjects/${params.id}/Topics`)).then((querySnapshot) => {
        let topics: string[] = [];
         querySnapshot.forEach((doc) => {
            topics.push(doc.data().Topic);
         })
        setTopicList(topics);
      })
   }, [])

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
            <div className="div-for-gt-btn"><button onClick={navToSubject} className="btn-go-to-subject">Wróć do oprzedniej strony</button></div>
        </div>
        <div className="empty-space" style={{backgroundImage:`url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}></div>
    </div>
        </>
    )
}