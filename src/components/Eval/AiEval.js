import { useEffect,useState } from "react"
import Spinner from "../ui/Spinner"
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import { CheckCircle } from "lucide-react"
function AiEval({setStep}){
    let nav = useNavigate()
    let {tube_id} = useParams()
    let [isTermVerified,setTermVerified] = useState(false)
    let [isAiVerified,setAiVerified] = useState(false)

    useEffect(()=>{
       
     let github_project = JSON.parse(sessionStorage.getItem('gitProject'))
     console.log(github_project)
     if(github_project && tube_id){
        axios.post(process.env.REACT_APP_BACKEND_URL+"certificate/patternMatching",{url:github_project.url,id:tube_id}).then(res=>{
             let scores = res.data
             const calculateOverallScoreOutOf5 = (arr) => {
                const totalScoredPoints = arr.reduce((sum, obj) => sum + obj.scored_points, 0);
                const totalPoints = arr.reduce((sum, obj) => sum + obj.total_points, 0);
                
                const overallScoreOutOf5 = (totalScoredPoints / totalPoints) * 5;
                
                return overallScoreOutOf5.toFixed(1);
              };
              
              const overallScore = calculateOverallScoreOutOf5(scores);
              console.log("Overall Score out of 5:", overallScore);
              sessionStorage.setItem('termScore',overallScore)
              setTermVerified(true)

              axios.post(process.env.REACT_APP_BACKEND_URL+"certificate/projectValidation",{url:github_project.url,id:tube_id}).then(res=>{
                console.log(res.data)
                sessionStorage.setItem("aiEval",JSON.stringify(res.data))
                setAiVerified(true)
               setStep(1)
           }).catch(err=>{
               console.log(err)
           })
        }).catch(err=>{
            console.log(err)
        })
     }else{
nav('/')
     }
       
    },[])


    return(
        <>
        <div className="container lg:p-5 mt-5">
            
<p className="text-lg font-poppins">Evaluations</p>

<div className="mt-5 border rounded-lg lg:p-2">
    <div className="my-3 border-b">
        <p className="mb-1 ms-2">{isTermVerified?<CheckCircle className="inline bg-primary text-white me-2 rounded-full"/>:<Spinner sizeClass={"size-4"}/>}Term evaluation</p>
        <p className="text-xs text-gray-400 ms-2 mb-3">
        This involves matching keywords from the instructor’s criteria with those in the your project. our algorithm would check the presence of specific keywords or concepts to ensure the project covers the required elements.
        </p>
        </div>
    <div className="my-3 border-b">
        <p className="mb-1 ms-2">{isAiVerified?<CheckCircle className="inline bg-primary text-white me-2 rounded-full"/>:<Spinner sizeClass={"size-4"}/>}Project evaluation <span className="text-xs text-gray-400">powered by AI</span>
        </p>

        <p className="text-xs text-gray-400 ms-2 mb-3">
        Your GitHub project is fed to the AI, which analyzes the project structure, code quality, and completion of required tasks according to the instructor's specifications.
        </p>
        </div>
</div>
        </div>
        </>
    )
}
export default AiEval