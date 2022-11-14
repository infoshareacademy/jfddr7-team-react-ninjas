import { useNavigate } from "react-router-dom"

export const UserPanel = () => {
    const navigate = useNavigate()
    const goToAvatar = () => {
        navigate("'/avatar-choice'")
    }
   return (
    <div className="User-Panel">
        <h3>Panel Uzżytkowanika</h3>
        <button onClick={goToAvatar}></button>
    </div>
   )
}