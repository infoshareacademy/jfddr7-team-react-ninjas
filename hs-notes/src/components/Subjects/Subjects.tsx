import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Subjects.style.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Subjects = () => {

   const [subjectList, setSubjectList] = useState(['']);
   const downloadData = async () => {
      getDocs(collection(db, 'Subjects')).then((querySnapshot) => {
         let subjects:string[] = [];
         querySnapshot.docs.forEach((doc) => {
            subjects.push(doc.data().Subject)
         })
         setSubjectList(subjects);
      })

      
   }

   useEffect(() => {
      downloadData();
      console.log(subjectList);
   },[])
   

    return (
       <div className='div-subject'>
          {subjectList.map((subject, number) => (
            <div className='subject' key={number}><Link to={`/subjects/${subject}`}> {subject} </Link></div>
          ))}
       </div>
    )
}