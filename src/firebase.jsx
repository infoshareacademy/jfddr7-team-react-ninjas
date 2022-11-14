import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';



// const firebaseConfig = {
//   apiKey: "AIzaSyAXDixMFG0bWox72Yyg6hU7_DklCSLIIKw",
//   authDomain: "hs-notes-5a863.firebaseapp.com",
//   projectId: "hs-notes-5a863",
//   storageBucket: "hs-notes-5a863.appspot.com",
//   messagingSenderId: "511050791083",
//   appId: "1:511050791083:web:28b5aa6b6b41e31914dfee",
//   measurementId: "G-XYZ63Q9NZG"
// };
const firebaseConfig = {
  apiKey: "AIzaSyD9otbtPZPJLdY2c6f_RwOntAIB1UU8cZg",
  authDomain: "test-c0ade.firebaseapp.com",
  projectId: "test-c0ade",
  storageBucket: "test-c0ade.appspot.com",
  messagingSenderId: "256423217089",
  appId: "1:256423217089:web:27096064ec10c6f1b45140",
  measurementId: "G-5RV0B76RQP"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);





