import { AudioLines, LogOutIcon } from "lucide-react"
import ProgressLg from "../../components/ui/QuizProgressLg/customProgressLg"
import {useSpeechSynthesis} from 'react-speech-kit'
import speakingIcon from '../../assets/lottie/speekingIcon.json'
import Lottie from "lottie-react"
import { useCallback, useEffect, useState } from "react"
import shortSuccess from  '../../assets/audio/short-success.mp3'
import wrong from '../../assets/audio/wrong.mp3'
import axios from 'axios'
import { useParams } from "react-router-dom"
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import  {darcula} from 'react-syntax-highlighter/dist/esm/styles/prism'
function Quiz(){
    const [quiz,setQuiz] = useState([])
    const {speak,speaking} = useSpeechSynthesis()
    const [choosedOne,setChooseOne] = useState(null)
    const [optionDefColor,setOptionDefColor] = useState("bg-gray-50  text-gray-600")
    const [selectOptColor,setSelOptColor] = useState("")
    const [optState,setOptState] = useState(false)
    const {tube_id} = useParams('tube_id')
    let[currentQuiz,setCurrentQuiz] = useState(0)
    let [shuffledArr,setShuffledArr] = useState([])

    useEffect(()=>{
        // axios.post(process.env.REACT_APP_BACKEND_URL+"tube/ai-quiz-generate",{tube_id}).then(res=>{
        //     console.log(res.data)
        // }).catch(err=>{
        //     console.log(err)
        // })

        let shuffle = (arr)=>{
            let array =arr.slice()
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        axios.get(process.env.REACT_APP_BACKEND_URL+"tube/fetch-quizzes/"+tube_id).then(res=>{
            console.log(res.data.total_quizzes[0])
            console.log(res.data.total_quizzes[0].options)
            let quizzes = res.data.total_quizzes
            let shuffledOptionQuiz = quizzes.map((val)=>{
                let s_opt = shuffle(val.options)
                val.options = s_opt
                return val
            })
            console.log(shuffledOptionQuiz)
            setShuffledArr(shuffledOptionQuiz)
            setQuiz(res.data.total_quizzes)
            
        }).catch(err=>{
            console.log(err)
        })
    },[])


    const checkAnswer = (val,i)=>{
        
        if(quiz.length === currentQuiz+1) return
        setOptState(true)
        if(val === quiz[currentQuiz].options[quiz[currentQuiz].answer]){
            const audio = document.createElement('audio')
            audio.src = shortSuccess
            audio.style = "display:none"
            audio.play()
            setChooseOne(i)
            setSelOptColor("bg-green-100 text-green-600")
            
            setTimeout(()=>{
                setCurrentQuiz(currentQuiz+1)
                setChooseOne(null)
                setSelOptColor(optionDefColor)
                setOptState(false)
            },1500)
        }else{
            const audio = document.createElement('audio')
            audio.src = wrong
            audio.style = "display:none"
            audio.play()
            setChooseOne(i)
            setSelOptColor("bg-red-100 text-red-600")
           
            setTimeout(()=>{
                setCurrentQuiz(currentQuiz+1)
                setChooseOne(null)
                setSelOptColor(optionDefColor)
                setOptState(false)
            },1500)
        }
    }


    return(
        <>
            <div className="container mx-auto">
                <ProgressLg />
                <p className="mt-5 text-red-600 text-end mx-5 hover:cursor"><span className="cursor-pointer hover:bg-gray-50 rounded-lg p-3"><LogOutIcon className="inline me-2"/> Quit The Quiz</span></p>
                {/* quiz container */}
               {quiz.length > 0 ?( <div className="flex p-5 justify-center mt-20">
                <div className="w-11/12 lg:w-5/12">
                        <p className="font-poppins text-primary font-semibold text-center">Question {currentQuiz+1}/{quiz.length}</p>
                        <p className="font-poppins mt-5 ">{quiz[currentQuiz].question} <span onClick={()=>{speak({text:quiz[currentQuiz].question,rate:0.7,pitch:1})}}>
                            {!speaking?<AudioLines className="inline ms-4 hover:cursor-pointer"/>:<div className="inline relative"><Lottie animationData={speakingIcon} loop={true}  style={{"height":"45px","width":"45px","display":"inline-block","position":"absolute","top":"-10px"}}/> </div>}
                        </span></p>
                        {quiz[currentQuiz].extention?<p>{quiz[currentQuiz].description}</p>:null}
                       {quiz[currentQuiz].code? 
                       <div className="flex justify-center">
                       <div className="w-full max-w-3xl overflow-x-auto">
                         <SyntaxHighlighter
                           language={quiz[currentQuiz].extension.replace('.','')}
                           style={darcula}
                           wrapLines={true}
                           customStyle={{
                             overflowX: 'auto', // Ensure horizontal scrolling is enabled
                             padding: '20px', // Optional: add padding for aesthetics
                             borderRadius:"10px"
                           }}
                           useInlineStyles={true}
                           showLineNumbers={true}
                         >
                           {quiz[currentQuiz].code.replace(/\\n/g, '\n')}
                         </SyntaxHighlighter>
                       </div>
                     </div>: <></>} 

                        <div className="mt-10">
                           {shuffledArr[currentQuiz].options.map((val,index)=>{
                            return(
                                <>
                                 <button disabled={optState} onClick={()=>{checkAnswer(val,index)}} className={`block p-2 border w-full text-start rounded-xl ps-5 ${choosedOne === index?selectOptColor:optionDefColor} font-semibold mt-5 mb-5`}>{index+1}) <span className="ms-5">{val}</span></button>
                                </>
                            )
                           })}
                          
                        </div>
                    </div>
                </div>):null}

            </div>
        </>
    )
}
export default Quiz


