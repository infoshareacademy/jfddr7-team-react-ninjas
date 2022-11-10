import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { db } from "../../firebase";

export const SubjectNotes = () => {
    const [subjectsObject, setSubjectObject] = useState([]);
    const [newTopic, setNewTopic] = useState(null);
    const params = useParams();
    
    const [topicList, setTopicList] = useState(['']);
    const downloadData = async () => {
      getDocs(collection(db, `/Subjects/${subjectsObject}/Topics`)).then((querySnapshot) => {
        let topics: string[] = [];
         querySnapshot.forEach((doc) => {
            topics.push(doc.data().Topic);
         })
        setTopicList(topics);
      })
   }

    const   paramsGetter: any = async (n: any) => {
    const obj: object | any = {};
    const querySnapshot = await  getDocs(collection(db, 'Subjects'));
    let subjects: any = [];
    let ids: any = [];
    querySnapshot.docs.forEach((doc) => {
        ids.push(doc.id);
        subjects.push(doc.data().Subject)
    })
    subjects.forEach((element:any, index: any) => {
        obj[element] = ids[index];
    });
    return obj[n];
   }

   const addTopicToDb = () => {
    addDoc(collection(db, `/Subjects/${subjectsObject}/Topics`), {
        Topic: newTopic,
    })
   }

   
    useEffect(() => {
        paramsGetter(params.id)
        .then((data: any) => setSubjectObject(data))
    }, [])


   useEffect(() => {
    downloadData();
   }, [subjectsObject, addTopicToDb])
   
    
    return (
        <div>
            <h1>Tematy z {params.id}</h1>
            <label htmlFor="newTopic">Dodaj nowy temat</label>
            <input type="text" onChange={(e: any) => setNewTopic(e.target.value)}/>
            <button onClick={addTopicToDb}>Dodaj nowy temat</button>
            <div className="topic-list">
                {topicList.map((item, number) => (
                    <div key={number}><Link to={`/subjects/${item}`}> {item} </Link></div>
                ))}
            </div>
        </div>
    )
}