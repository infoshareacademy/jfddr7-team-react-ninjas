import { db } from '../../firebase';
import { collection, getDocs, QuerySnapshot, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import './Subjects.style.css';
import { useEffect, useState } from 'react';
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
   
   const subjectNavigationHandler = (e: any) => {
      // navigate()
      const html = e.target;
      console.log(html);
      
      
   }

    return (
       <div>
          {subjectList.map((subject, number) => (
            <div key={number} onClick={subjectNavigationHandler}> {subject}</div>
          ))}
       </div>
    )
}