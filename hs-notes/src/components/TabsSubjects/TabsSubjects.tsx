import { useContext } from 'react';
import {Link} from 'react-router-dom'
import { SubjectsListContext } from '../SubjectsListProvider/SubjectListProvider';
import '../TabsSubjects/TabsSubjects.style.css'

export const TabsSubjects = () => {

    const {subjects} = useContext(SubjectsListContext)


    return ( 
        <div className="tabs-container">
            {subjects.map((subject) => (
                 <Link to={''} key={subject} className='subject-link'>{subject}</Link>
            ))}
        </div>
     );
}
 
