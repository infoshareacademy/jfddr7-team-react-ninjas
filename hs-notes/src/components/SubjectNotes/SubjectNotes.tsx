import { addDoc, collection, getDocs } from "firebase/firestore";
<<<<<<< HEAD
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
=======
import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom"
>>>>>>> 35a21cd68a3674a68772afbbfe5f220f40f09b83
import { db } from "../../firebase";
import './SubjectNotes.style.css'
import { Nav } from '../Nav/Nav'

// //map zamiast forEach

export const SubjectNotes = () => {
    const [subjectsObject, setSubjectObject] = useState([]);
    const [newTopic, setNewTopic] = useState(null);
    const params = useParams();
    
    const [topicList, setTopicList] = useState(['']);
//     const downloadData = async () => {
      
//    }
// //  zamknąć w useCallback()


<<<<<<< HEAD
//     const   paramsGetter: any = useCallback(async(n: any) => {
=======
//     const paramsGetter: any = useCallback( async (n: any) => {
>>>>>>> 35a21cd68a3674a68772afbbfe5f220f40f09b83
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
<<<<<<< HEAD
//    }, [])
=======
//    }, []);
>>>>>>> 35a21cd68a3674a68772afbbfe5f220f40f09b83

   const addTopicToDb = () => {
    addDoc(collection(db, `/Subjects/${params.id}/Topics`), {
        Topic: newTopic,
    })
   }

<<<<<<< HEAD

//     useEffect(() => {
//         paramsGetter(params.id) //useCallback()
//         .then((data: any) => setSubjectObject(data))
//     }, [])
=======
   
    // useEffect(() => {
    //     paramsGetter(params.id)
    //     // .then((data: any) => setSubjectObject(data))
    // }, [params.id, paramsGetter])
>>>>>>> 35a21cd68a3674a68772afbbfe5f220f40f09b83


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
             {/* <button onClick={addTopicToDb}>Dodaj nowy temat</button> */}
            </div>

            <div className="topic-list">
<<<<<<< HEAD
                {/* {topicList.map((item, number) => (
                    <div className="one-topic" key={number}>{item}</div> */}
                {/* ))}                 */}
            </div>
=======
                {topicList.map((item, number) => (
                    <div className="one-topic" key={number}>{item}</div>
                ))}                
            </div> 
>>>>>>> 35a21cd68a3674a68772afbbfe5f220f40f09b83

        </div>
        </>
    )
}