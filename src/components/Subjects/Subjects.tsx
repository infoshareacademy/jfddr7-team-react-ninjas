import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Subjects.style.css';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../Nav/Nav'
import { SubjectsListContext } from '../SubjectsListProvider/SubjectListProvider';


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
       <h2>Wybierz przedmiot z którego notatek chcesz skorzystać !</h2>
       <div className='div-subject'>
          {subjects.map((subject, number) => (
            <Link className='main-subject-link' to={`/subjects/${subject}`}>
               <div className='subject' key={number}> {subject} </div>
             </Link>
          ))}
       </div>
       </>
    )
}