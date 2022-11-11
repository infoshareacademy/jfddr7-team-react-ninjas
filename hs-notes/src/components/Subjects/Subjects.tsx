import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Subjects.style.css';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav } from '../Nav/Nav'
import { UserContext } from '../UserProvider/userProvider';

export const Subjects = () => {

   const {isAdmin, setIsAdmin} = useContext(UserContext)

   const [subjectList, setSubjectList] = useState(['']);
   const navigate = useNavigate()

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
   
   const navigateToAdmin = () => {
      navigate('/admin')
   }

    return (
      <>
       <Nav/>
       <div className='div-subject'>
          {subjectList.map((subject, number) => (
            <div className='subject' key={number}><Link to={`/subjects/${subject}`}> {subject} </Link></div>
          ))}
       </div>
       {isAdmin && <button className='button-add-subject' onClick={navigateToAdmin}>Dodaj przedmiot</button>}
       </>
    )
}