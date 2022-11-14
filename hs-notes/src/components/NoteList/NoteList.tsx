import { useParams } from "react-router-dom"
import { Nav } from "../Nav/Nav"

export const NoteList = () => {

    const params = useParams();
    console.log(params.id);
    console.log(window.location.href);
    
    
    return (
        <>
            <Nav/>
            <div>Notatki z tematu: {params.id}</div>
        </>
        
    )
}