import { useParams } from "react-router-dom"

export const Note = () => {
    const params = useParams();
    const subject = window.location.href.split('/')[4];
    const topic  = window.location.href.split('/')[5];
    
    
    

    return (
        <>
            <div>Notatka : {params.id}</div>
            
        </>
    )
}