import { Book, Lightbulb, Trophy, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import axios from 'axios'
import { json } from "react-router-dom";
import Spinner from "../ui/Spinner";
function Preview({setStep}){
    let [data,setData] = useState(null)

    useEffect(()=>{

     let aiEval = JSON.parse(sessionStorage.getItem('aiEval'))
     let termScore = JSON.parse(sessionStorage.getItem('termScore'))
     let totalCorrectQuiz = JSON.parse(sessionStorage.getItem('totalCorrectQuiz'))
     let language = JSON.parse(sessionStorage.getItem('youtuberInfo'))
     let tube = JSON.parse(sessionStorage.getItem('youtuberTube'))
   let comments = aiEval.map((val,i)=>{
    let jsonParsedVal = JSON.parse(val)
         let obj = {
            filePath:tube.conditions[i].filePath ,
            comment:jsonParsedVal.comment,
         } 
         return obj
     })
const calculateOverallScoreOutOf10 = (arr) => {
  const totalScoredPoints = arr.reduce((sum, obj) => sum + JSON.parse(obj).points, 0);
  const totalPoints = arr.reduce((sum, obj) => sum + 10, 0);
  const overallScoreOutOf10 = (totalScoredPoints / totalPoints) * 10;
  return overallScoreOutOf10.toFixed(1); 
};
     let aiPoints = calculateOverallScoreOutOf10(aiEval)
     let obj = {
        aiEval,
        termScore,
        totalCorrectQuiz,
        language,
        tube,
        comments,
        aiPoints:parseFloat(aiPoints)
     }
     console.log(obj)
    setData(obj)
    },[])

    let next = ()=>{
        let totalQuiz = data.totalCorrectQuiz
        let totalAi = data.aiPoints+data.termScore
        if((totalQuiz>6&&totalQuiz<15) && (totalAi>=8&&totalAi<15)){
            alert("You passed the evaluation")
            //setStep(2)
        }else{
            alert("You did not pass the evaluation and will need to begin again from the first round")

           
        }
        
    }
    return(
        <>
        <div className="container lg:p-5 mt-5">
            {!data?<div className="flex justify-center mt-5"><Spinner sizeClass={"size-20"}/></div>: <div>
             <div className="lg:flex mt-5  gap-5 w-full">
                <div className="flex gap-2 mt-10 w-full lg:w-6/12">
               <div>
                    <span className="bg-slate-100 rounded-full p-2 inline-block font-poppins font-thin"><Trophy size={20} /></span>
                    </div>
                    <div>
                        <p className="text-xl mb-2 font-poppins">Scores</p>
                        <p className="mb-1"><span  className="text-gray-400">Scored at quizzes: </span>{data.totalCorrectQuiz}/15</p>
                        <p className="mb-1"><span  className="text-gray-400">Scored at AI evaluation: </span>{data.termScore+data.aiPoints}/15</p>
                        <p className="mb-1"><span  className="text-gray-400">Language: </span>{data.language.language} </p>
                    </div>
               </div>

                <div className="flex gap-2 mt-10 w-full lg:w-6/12">
               <div>
                    <span className="bg-slate-100 rounded-full p-2 inline-block font-poppins font-thin"><Book size={20} /></span>
                    </div>
                    <div>
                        <p className="text-xl mb-2 font-poppins">Course Detail</p>
                        <p className="mb-1"><span  className="text-gray-400">Course Name: </span> {data.tube.title}</p>
                        <p className="mb-1"><span  className="text-gray-400">resource: </span>youtube</p>
                        <p className="mb-1"><span  className="text-gray-400">channel name: </span>{data.language.channelName}</p>
                    </div>
               </div>

               
                </div>
              
                <div className="gap-5 mt-16 border-t w-full">
                <p className="mt-5 font-poppins">Suggestion By AI <Lightbulb className="inline ms-2"/></p>
            {data.comments.map((val)=>{
                return(
                    <> 
<div className="mt-5 mb-5">
<code className="bg-zinc-100 rounded-lg p-2 block mt-5">
<p className="font-semibold">In file:  {val.filePath}</p>
</code>
 <p className="mt-5 font-notoSans">{val.comment}</p>

</div>

                     </>)
            })}
               <div className="flex gap-2 w-full lg:w-6/12">
              
               </div>
                   
                </div>
             </div>}
<div className="flex justify-end w-full">
<button onClick={next} className="block bg-primary text-white py-2 px-5 rounded-lg mt-5 text-end">Next</button>

</div>
        </div>
        </>
    )
}


export default Preview