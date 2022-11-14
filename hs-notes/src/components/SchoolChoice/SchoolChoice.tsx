import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import image from '../../img/bookshelf.jpeg'
import './SchoolChoice.style.css'
import logo from '../../img/logo.png'
import { UserContext } from "../UserProvider/userProvider";
import { useNavigate } from "react-router-dom";


export const CityChoice = () => {
    const [citiesList, setCitiesList] = useState([""]);
    const [schoolList, setSchoolList] = useState([""]);
    const [filterSchoolList, setFilterSchoolList] = useState([""]);
    const {school, setSchool} = useContext(UserContext)
    const navigate = useNavigate()
    
   const DownladCities = async () => {
      getDocs(collection(db, 'Cities')).then((querySnapshot) => {
         let city:string[] = [];
         querySnapshot.docs.forEach((doc) => {
            city.push(doc.data().City)
         })
         console.log(city)
         setCitiesList(city);
      })
    }

    const DownladSchools = async () => {
      getDocs(collection(db, 'Schools')).then((querySnapshot) => {
         let school:string[] = [];
         querySnapshot.docs.forEach((doc) => {
            school.push(doc.data().School)
         })
         console.log(school)
         setSchoolList(school);
         setFilterSchoolList(school)
      })
    }
    

      useEffect(() => {
        DownladCities();
        console.log(citiesList)  
      },[])

      useEffect(()=> {
        DownladSchools();
        console.log(schoolList)
      },[])

      const cityHandler = (e: any) => {
        console.log(e.target.value)
        const test = schoolList.filter((school) => 
          school.includes(e.target.value)
        )
        setFilterSchoolList(test)
      }

      const addSchool = () => {
        setSchool(school)
        navigate('/subjects')
      }

      

   
    return (
  <div className='background' style={{backgroundImage:`url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>

    <div className="school-container">
      <img className="logo" src={logo} alt={'hs notes'}/>
      <h3>Wybierz swoje miasto oraz szkołę!</h3>
      <span className="schoolSpan">Wybierz misto!</span>
      <select onChange={cityHandler}  name="selectCity" className="selectCity">
          {citiesList.map((city, number) => (
          <option key={number}> {city} </option>))}
        </select>        
      
        <span className="schoolSpan">Wybierz szkołę!</span>
        <select name="selectSchool" className="selectCity">
          {filterSchoolList.map((school, number) => (
          <option key={number}> {school} </option>))}
      </select>
    </div>    \

    <button onClick={addSchool}>Dodaj</button>         
      
  </div>
    )
}