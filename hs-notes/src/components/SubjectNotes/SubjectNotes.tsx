import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { db } from "../../firebase";

export const SubjectNotes = () => {
    const params = useParams();
    
    const [topicList, setTopicList] = useState(['']);
    const downloadData = async () => {
      getDocs(collection(db, '/Subjects/2VyggQ76uMI3CzPnwzUx/Topics')).then((querySnapshot) => {
        let topics: string[] = [];
         querySnapshot.forEach((doc) => {
            topics.push(doc.data().Topic);
         })
        setTopicList(topics);
      })
   }
   console.log(topicList);
   
   useEffect(() => {
    downloadData();
   }, [])
   
    
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