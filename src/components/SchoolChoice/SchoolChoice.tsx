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
        const cityChoiceSelect = schoolList.filter((school) => 
          school.includes(e.target.value)
        )
        setFilterSchoolList(cityChoiceSelect)
      }

      const selectSchool = (e: any) => {
        console.log(e.target.value)
        setSchool(e.target.value)        
      }

      const addSchool = () => {
        navigate('/subjects')
      }
      

   
    return (
  <div className='background' style={{backgroundImage:`url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>

    <div className="school-choice-container">
      <img className="school-choice-logo" src={logo} alt={'hs notes'}/>
      <h2 className="school-choice-h2">Wybierz swoje miasto oraz szkołę!</h2>

      <div className="school-choice-div">
      <span className="school-choice-span">Wybierz misto!</span>

      <select onChange={cityHandler}  name="selectCity" className="school-choice-select">
          {citiesList.map((city, number) => (
          <option key={number}> {city} </option>))}
      </select>        
      
      <span className="school-choice-span">Wybierz szkołę!</span>

      <select onChange={selectSchool} name="select" className="school-choice-select">
          {filterSchoolList.map((school, number) => (
          <option key={number}> {school} </option>))}
      </select>
       <button onClick={addSchool} className="school-choice-btn-add">Dodaj</button> 
       </div>
    </div>    
  
      
  </div>
    )
}