import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Subjects.style.css';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../Nav/Nav'
import { SubjectsListContext } from '../SubjectsListProvider/SubjectListProvider';
import { UserContext } from '../UserProvider/userProvider';

export const Subjects = () => {

   const {subjects, setSubjects} = useContext(SubjectsListContext);
   
   

   const downloadData = async () => {
      getDocs(collection(db, 'Subjects')).then((querySnapshot) => {
         let subjects:string[] = [];
         querySnapshot.docs.forEach((doc) => {
            subjects.push(doc.data().Subject)
         })
         setSubjects(subjects);
      })
   }

   useEffect(() => {
      downloadData();
      console.log(subjects);
   },[])
   
   

    return (
      <>
       <Nav/>
       <div className='div-subject'>
          {subjects.map((subject, number) => (
            <div className='subject' key={number}><Link className='subject-link' to={`/subjects/${subject}`}> {subject} </Link></div>
          ))}
       </div>
      
       </>
    )
}