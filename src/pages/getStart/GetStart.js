import { ArrowRightCircle, Languages, UserRound, YoutubeIcon } from "lucide-react"
import { useEffect, useState } from "react"
import 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
function GetStart(){  
    let [tube,setTube] = useState(null)  
    let [info,setInfo] = useState(null)
    let [isQuizGenerated,setIsQuizGenerated] = useState(false)
let {tube_id}= useParams('id')
let nav = useNavigate()
    useEffect(()=>{
            console.log(tube_id)
     if(tube == null){
        axios.get(process.env.REACT_APP_BACKEND_URL+"tube/getTube/"+tube_id).then(res=>{
            console.log(res.data)
            setTube(res.data.data)
            setInfo(res.data.info)
        }).catch(err=>{
            console.log(err)
        })
     }
    },[])

    useEffect(()=>{


            axios.post(process.env.REACT_APP_BACKEND_URL+"tube/ai-quiz-generate",{tube_id}).then(res=>{
                console.log(res)
                setIsQuizGenerated(true)
            }).catch(err=>{
                console.log(err)
            })
    },[])

    let getStart = ()=>{
        console.log("started")
        sessionStorage.setItem("youtuberInfo",JSON.stringify(info))
        sessionStorage.setItem("youtuberTube",JSON.stringify(tube))
        nav('/quizzes/'+tube_id)
    }
    return(
        <>
   {tube == null?null:     <div className="w-full  ">
      <h1 className="text-primary  text-xl font-semibold mt-5 ms-5 font-poppins">Credoff</h1>
        <div className="lg:flex justify-center gap-6 mt-10 p-5">
            <div className="w-full lg:w-4/12 mb-7">
                <img src={process.env.REACT_APP_BACKEND_URL+"thumbnail/"+tube.thumbnail} className="rounded-lg"/>

                <div className="mt-5 font-poppins">
                <p className="font-poppins mt-5 text-zinc-500 border-b border-zinc-400 pb-2 mb-5">About Youtuber (Tutor)</p>
                <p className="font-light mb-5"><UserRound className="inline me-2 "/>{info.fullName}</p>
                <p className="font-light mb-5"><YoutubeIcon className="inline me-2 bg-red-600 text-white rounded-full p-1"/>{info.channelName}</p>

                <p className="font-light mb-5"><Languages className="inline me-2"/>{info.language}</p>
                </div>

            </div>

            <div className="w-full lg:w-5/12 flex flex-col mb-16">
                <div>
                <h1 className="text-2xl font-poppins font-semibold text-gray-600">{tube.title}</h1>
                </div>

                <div>
                    <p className="font-poppins mt-5 text-zinc-500 border-b border-zinc-400 pb-2">Description</p>
                    <p className="font-notoSans mt-5 font-light ">
                   {tube.desc}
                    </p>
                </div>

                <div>
                    <p className="font-poppins mt-5 text-zinc-500 border-b border-zinc-400 pb-2">Key Guidelines to Follow Before You Begin</p>
                    <span className="font-semibold font-notoSans mt-5 block text-xs">*To successfully earn a certificate, your project must meet the terms and conditions defined for this course*</span>
                    <div className="font-notoSans mt-5 font-light">
            {/* terms start */}
            <p> <b className="font-poppins">Terms:</b> Ensure your code includes specific elements or keywords based on the course content and youtubers specs in specific file paths</p>
                    {/* terms set */}
                    <div>
                        {
                            tube.terms.map((item,index)=>{
                                return(
                                    <>
                                       <code className="bg-zinc-100 rounded-lg p-2 block mt-5 ">
                   
                   <p className="font-semibold font-pressStart2p">{item.filePath}</p>
                   </code>

                 {item.keywords.map((key,index)=>{
                     return(
                        <span  className="bg-primary p-2 px-3 lg:px-5 lg:p-2  inline-block rounded-lg text-white my-2 mx-1">{key}</span>
                     )
                 })}
                                    </>
                                )
                            })
                        }
                 
                    
                  
                    </div>
            {/* terms end */}


                <div>
                <p className="mt-10"> <b className="font-poppins">Conditions:</b> Follow specific guidelines set by the course tutor to verify functionality.<br /> <br /> Make sure you are Wrapped the certain parts of your code in specific comments to identify and validate sections of the code.</p>

{tube.conditions.map((item,index)=>{
    return(
        <div>
<code className="bg-zinc-100 rounded-lg p-2 block mt-5">
<p className="font-semibold">{item.filePath}</p>
<div className="text-center">
<p className="font-semibold"> {item.commentStart}</p>
<p className="font-semibold">`block of code`</p>
<p className="font-semibold">{item.commentEnd}</p>
</div>

</code>
<b className="mt-5 block mb-1 ms-2">Tutor Prompt:</b>
<span  className="bg-primary p-2 px-3 lg:px-5 lg:p-2  inline-block rounded-lg text-white my-2 mx-1">{item.function}</span>


</div>
    )
})}
                </div>
                    </div>
                </div>

                <div>
                <p className="font-poppins mt-5 text-zinc-500 border-b border-zinc-400 pb-2">Evaluation Limits</p>
                
                <span className="block mt-5 font-poppins mb-2">You have two evaluation attempts to meet the course standards:</span>
                <ul className="list-disc font-notoSans font-light">
                    <li className="mb-2 mt-2 ">If you do not pass after two attempts, you will not be able to retake the evaluation for this course with the same YouTuber.</li>
                    <li className="mb-2">If you exhaust both attempts, consider finding another course on the same topic from a different YouTuber and applying the skills you learned to a new project.</li>
                </ul>
                </div>

                <div>
                <p className="font-poppins mt-5 text-zinc-500 border-b border-zinc-400 pb-2">Make Sure Your Project Reflects Your Understanding</p>

                <p className="mt-3 font-notoSans font-light">The AI evaluation checks that your project demonstrates practical knowledge and aligns with the course objectives. Projects should show a solid understanding of the topics covered in the videos and should not rely solely on quizzes for certification.</p>
                </div>

                <div>
                <p className="font-poppins mt-5 text-zinc-500 border-b border-zinc-400 pb-2">Use Specified Languages and Tools</p>

                <p className="mt-3 font-notoSans font-light">Your project should be built using <b>{tube.programming_language} </b>as indicated by the course. Using other languages or frameworks may result in a failed evaluation if they don’t match the course objectives.</p>
                </div>

                    <b className="font-poppins block text-xs mt-5 bg-yellow-200 p-2 rounded-lg mb-10"> *In the current beta version, there are no limits on evaluation attempts. Learners can submit their projects for evaluation as many times as needed*.
                    </b>
                <button onClick={()=>{getStart()}} disabled={isQuizGenerated?false:true} className={`bg-primary text-white font-poppins mt-10 p-2 fixed -bottom-1 right-0 lg:text-lg w-full py-5 ${isQuizGenerated?"":"cursor-not-allowed opacity-90"}`}>{isQuizGenerated?<span>Begin your certificate journey</span>:<span>Wait a While</span>} <ArrowRightCircle className="inline ms-2 size-5"/></button>
            </div>
        </div>
    </div>}
        </>
    )
}
export default GetStart