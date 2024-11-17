import { AudioLines, LogOutIcon,ArrowBigLeft,AlarmClock} from "lucide-react"
import ProgressLg from "../../components/ui/QuizProgressLg/customProgressLg"
import {useSpeechSynthesis} from 'react-speech-kit'
import speakingIcon from '../../assets/lottie/speekingIcon.json'
import Lottie from "lottie-react"
import { useEffect, useState } from "react"
import shortSuccess from  '../../assets/audio/short-success.mp3'
import wrong from '../../assets/audio/wrong.mp3'
import tick from '../../assets/audio/watch-ticking.mp3'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import  {darcula} from 'react-syntax-highlighter/dist/esm/styles/prism'
import 'react-router-dom'
function Quiz(){
    const [quiz,setQuiz] = useState([])
    const {speak,speaking} = useSpeechSynthesis()
    const [choosedOne,setChooseOne] = useState(null)
    const [optionDefColor,setOptionDefColor] = useState("lg:bg-gray-50  text-gray-600")
    const [selectOptColor,setSelOptColor] = useState("")
    const [optState,setOptState] = useState(false)
    const {tube_id} = useParams('tube_id')
    let[currentQuiz,setCurrentQuiz] = useState(0)
    let [shuffledArr,setShuffledArr] = useState([])
    let [qCompletion,setQCompletion] = useState(0)
    let [timer,setTimer] = useState(16)
    let [tickSound,setTicksound] = useState({
        audio:new Audio(tick)
    })
    let [isAllowedAudioPlayback,setIsAllowedAudioPlayback] = useState(false)
    let [totalCorrect,setTotalCorrect] = useState(0)
    let nav = useNavigate()
    useEffect(()=>{
        // axios.post(process.env.REACT_APP_BACKEND_URL+"tube/ai-quiz-generate",{tube_id}).then(res=>{
        //     console.log(res.data)
        // }).catch(err=>{
        //     console.log(err)
        // })

        let shuffle = (arr)=>{
            let array = arr.slice()

            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
          
            return array;
        }

        axios.get(process.env.REACT_APP_BACKEND_URL+"tube/fetch-quizzes/"+tube_id).then(res=>{
            console.log("real array of options: ",res.data.total_quizzes[0].options)
            let quizzes = JSON.parse(JSON.stringify(res.data.total_quizzes));
            let shuffledOptionQuiz = quizzes.map((val)=>{
                let s_opt = shuffle(val.options)
                val.options = s_opt
                return val
            })
            
            console.log("quiz is shuffle indirectly: ",res.data.total_quizzes[0].options)
            console.log("quiz with shuffle: ",shuffledOptionQuiz[0].options)
            setShuffledArr(shuffledOptionQuiz)
            setQuiz(res.data.total_quizzes)
            
        }).catch(err=>{
            console.log(err)
        })
    },[tube_id])


    const checkAnswer = (val,i)=>{
        console.log(val,quiz[currentQuiz])
        if(quiz.length === currentQuiz+1){
            tickSound.audio.pause()
            if(val === quiz[currentQuiz].options[quiz[currentQuiz].answer]){
                const audio = document.createElement('audio')
            audio.src = shortSuccess
            audio.style = "display:none"
            audio.play()
            sessionStorage.setItem('totalCorrectQuiz',totalCorrect)

          setTimer(0)
            setTimeout(()=>{
                nav('/gitProject')
            },3000)

            return
            }else{
                const audio = document.createElement('audio')
                audio.src = wrong
                audio.style = "display:none"
                audio.play()
             
                setTimer(0)
                sessionStorage.setItem('totalCorrectQuiz',totalCorrect)
                setTimeout(()=>{
                    nav('/gitProject')
                },3000)
                return

            }

         
        }
        setOptState(true)
        setQCompletion(qCompletion+6.66)
        tickSound.audio.pause()
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
                setTimer(15)
            },2500)

            setTotalCorrect(totalCorrect+1)
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
                setTimer(15)
            },2500)

           
        }
    }

    useEffect(()=>{
      if(isAllowedAudioPlayback === true) {
        tickSound.audio.play()
      }
       let interval =  setInterval(() => {
           setTimer(timer-1)
        }, 1000);

    if (timer === 0) {
        tickSound.audio.pause()
        clearInterval(interval);
      
        
       setTimeout(()=>{
        setCurrentQuiz(currentQuiz+1)
        setTimer(15)
       },2500)
        setChooseOne(null)
        setSelOptColor(optionDefColor)
        setOptState(false)
       

      }

      if(timer === 0 && currentQuiz === quiz.length-1){
        tickSound.audio.pause()
        clearInterval(interval);
        sessionStorage.setItem('totalCorrectQuiz',totalCorrect)
        nav('/gitProject')
      }
  
      return () => clearInterval(interval);
    },[timer,currentQuiz])

 let allowPlayBack = ()=>{
    setIsAllowedAudioPlayback(true)
    tickSound.audio.play()
    tickSound.audio.loop = true
}
   
    return(
        <>
        
            <div className="container mx-auto">
               {isAllowedAudioPlayback === true?null: <div className="relative z-50 top-0 right-0 left-0 w-full bg-yellow-200 font-poppins text-sm ">
                        <div className="flex justify-between px-5 py-2 ">
                        <p>For a better experience, click "Play" to allow audio playback - <span className="text-white px-2 rounded-lg ms-5 bg-primary lg:hidden" onClick={()=>{allowPlayBack()}}>Play</span></p>
                        <button  className="bg-primary text-white px-5 py-1 rounded-lg hidden lg:block" onClick={()=>{allowPlayBack()}}>Play</button>
                        </div>
                     </div>}
                <div className="border border-b lg:border-none px-2 ">
               <div className="flex justify-between mt-5 mb-1 mx-5 lg:hidden ">
               <p className=" text-red-600 text-lg   hover:cursor"><span className="cursor-pointer hover:bg-gray-50 rounded-lg"><ArrowBigLeft className="inline mb-1 me-2"/>Leave Quiz</span></p>
                <p className="font-poppins text-primary "><span className="me-2"><AlarmClock className="inline mb-2 me-2"/>Time Left: </span>{timer}</p>

               </div>
                <ProgressLg completion={qCompletion}/>
<div className="hidden lg:flex mt-5 mb-2 mx-5 justify-between">
<p className="font-poppins text-primary "><span className="me-2"><AlarmClock className="inline me-1"/>Time Left: </span>{timer}</p>
<p className=" text-red-600 hover:cursor"><span className="cursor-pointer hover:bg-gray-50 rounded-lg"><LogOutIcon className="inline me-2"/> Quit The Quiz</span></p>

</div>        
                </div>
                     {/* quiz container */}
               {quiz.length > 0 ?( <div className="flex p-5 justify-center mt-5 lg:mt-20">
                <div className="w-11/12 lg:w-5/12">
                        <p className="font-poppins text-primary font-semibold text-sm lg:text-center">Question {currentQuiz+1} of {quiz.length}</p>
                        <p className="font-poppins mt-5 w-full">{quiz[currentQuiz].question} <span onClick={()=>{speak({text:quiz[currentQuiz].question,rate:0.9,pitch:1})}}>
                            {!speaking?<AudioLines className="inline ms-4 hover:cursor-pointer"/>:<div className=" ms-4 inline relative"><Lottie animationData={speakingIcon} loop={true}  style={{"height":"45px","width":"45px","display":"inline-block","position":"absolute","top":"-10px"}}/> </div>}
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

                        <div className="mt-10 ">
                           {shuffledArr[currentQuiz].options.map((val,index)=>{
                            return(
                                <>
                                 <button disabled={optState} onClick={()=>{checkAnswer(val,index)}} className={` block p-2 border w-full text-start rounded-xl ps-5 ${choosedOne === index?selectOptColor:optionDefColor} font-semibold mt-5 mb-5`}> <div className="flex"><span className="block">{index+1})</span><span className="ms-5 block">{val}</span></div></button>
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


