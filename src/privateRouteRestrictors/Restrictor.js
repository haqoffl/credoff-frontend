import { Navigate } from "react-router-dom"
function Restrictor({children}){
    let learnerId = localStorage.getItem('learnerId') 
    let youtuberId = localStorage.getItem('youtuberId') 
    if(!learnerId && !youtuberId){
        return children

    }
    if(learnerId){
        return <Navigate to="/learner" replace />
    }

    if(youtuberId){
        return <Navigate to="/youtuber/dashboard" replace />
    }

    if(learnerId && youtuberId){
        localStorage.clear()
        return <Navigate to="/" replace />
    }
}

export default Restrictor