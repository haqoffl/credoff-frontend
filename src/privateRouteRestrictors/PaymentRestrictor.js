import { Navigate } from "react-router-dom"
function PaymentRestrictor({children}) {
    let learnerId = localStorage.getItem('learnerId') !== null
    let tube = sessionStorage.getItem('youtuberTube') !== null
    if(learnerId && tube){
        return children
    }
    return <Navigate to="/" replace />
}
export default PaymentRestrictor