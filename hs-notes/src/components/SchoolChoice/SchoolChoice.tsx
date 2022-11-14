import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";


export const CityChoice = () => {
    const [citiesList, setCitiesList] = useState([""]);
    const [schoolList, setSchoolList] = useState([""])
    
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
            school.push(doc.data().Schools)
         })
         console.log(school)
         setSchoolList(school);
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

      

   
    return (
      <>
      <div>
          <select name="selectCity" className="selectCity">
              {citiesList.map((city, number) => (
              <option key={number}> {city} </option>))}
          </select>                    
      </div>
      <div>
          <select name="selectSchool" className="selectSchool">
              {citiesList.map((number, school) => (
              <option key={number}> {school} </option>))}
          </select>    
      </div>
      </>
    )
}