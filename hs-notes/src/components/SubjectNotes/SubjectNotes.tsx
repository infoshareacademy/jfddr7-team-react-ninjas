import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom"
import { db } from "../../firebase";
import './SubjectNotes.style.css'
import { Nav } from '../Nav/Nav'

export const SubjectNotes = () => {
    const [subjectsObject, setSubjectObject] = useState([]);
    const [newTopic, setNewTopic] = useState(null);
    const params = useParams();
    
    const [topicList, setTopicList] = useState(['']);
//     const downloadData = async () => {
      
//    }

//     const paramsGetter: any = useCallback( async (n: any) => {
//     const obj: object | any = {};
//     const querySnapshot = await getDocs(collection(db, 'Subjects'));
//     let subjects: any = [];
//     let ids: any = [];
//     querySnapshot.docs.forEach((doc) => {
//         console.log(doc)
//         console.log('querySnapshot')
//         ids.push(doc.id);
//         subjects.push(doc.data().Subject)
//     })
//     subjects.forEach((element:any, index: any) => {
//         obj[element] = ids[index];
//     });

//     console.log('obj[n]', obj[n])
//     return obj[n];
//    }, []);

   const addTopicToDb = () => {
    addDoc(collection(db, `/Subjects/${params.id}/Topics`), {
        Topic: newTopic,
    })
   }

   
    // useEffect(() => {
    //     paramsGetter(params.id)
    //     // .then((data: any) => setSubjectObject(data))
    // }, [params.id, paramsGetter])


   useEffect(() => {
    getDocs(collection(db, `/Subjects/${params.id}/Topics`)).then((querySnapshot) => {
        let topics: string[] = [];
         querySnapshot.forEach((doc) => {
            topics.push(doc.data().Topic);
         })
        setTopicList(topics);
      })
    console.log(params.id);
      
   }, [])
   
    
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
                    <div className="one-topic" key={number}>{item}</div>
                ))}                
            </div> 

        </div>
        </>
    )
}