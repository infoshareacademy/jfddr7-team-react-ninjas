import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { db } from "../../firebase";

export const SubjectNotes = () => {
    const [subjectsObject, setSubjectObject] = useState([]);
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
    console.log(obj[n]);
    console.log(obj);
    
    return obj[n];
   }
//    console.log(params);
   
useEffect(() => {
    paramsGetter(params.id)
    .then((data: any) => setSubjectObject(data))
}, [])


   useEffect(() => {
    downloadData();
   }, [subjectsObject])
   
    
    return (
        <div>
            <h1>Notatki z {params.id}</h1>
            <div className="topic-list">
                {topicList.map((item, number) => (
                    <div key={number}>{item}</div>
                ))}
            </div>
        </div>
    )
}