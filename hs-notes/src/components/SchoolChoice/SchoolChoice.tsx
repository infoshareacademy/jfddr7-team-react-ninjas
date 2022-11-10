import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";


export const CityChoice = () => {
    const [citiesList, setCitiesList] = useState([""]);
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
    

      useEffect(() => {
        DownladCities();
        console.log(citiesList)  
      },[])

      

   
    return (
        <div>
            <select name="selectCity" className="selectCity">
                {citiesList.map((city, number) => (
                <option key={number}> {city}</option>))}
            </select>           
        </div>
    )
}