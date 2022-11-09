import { useParams } from "react-router-dom"

export const SubjectNotes = () => {
    const params = useParams();
    console.log(params);
    
    return (
        <div>
            <h1>Notatki z {params.id}</h1>
        </div>
    )
}