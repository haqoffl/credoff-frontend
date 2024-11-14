import { TypeAnimation } from "react-type-animation"
import 'react-step-progress/dist/index.css';
import StepProgressBar from 'react-step-progress'
import AiEval from "../../components/Eval/AiEval";
import Preview from "../../components/Eval/Preview";
import Payment from "../../components/Eval/Payment";
import { useState } from "react";
function Eval() {
    let [currentStep,setCurrentStep] = useState(0)
    console.log(currentStep)
    return (
        <>
            <div className="container mx-auto">
<div className="text-center">
<h1 className="font-poppins text-primary lg:text-2xl text-lg mt-6 font-bold">Credoff </h1>
<span className="hidden lg:block">     <TypeAnimation 
    sequence={[
        "Turn your youtube learnings into real Credoff",
        2000,
        "Turn your youtube learnings into real Credits",
        2000,
        "Turn your youtube learnings into real Credentials",
        2000
    ]
}
wrapper='span'
speed={20}
repeat={Infinity}

    /></span>
</div>
                <div className="flex lg:justify-center w-full">
                        <div className="w-full lg:w-8/12  shadow-slate-200 p-0 lg:p-5 rounded-lg">
                                        <StepProgressBar
                                        key={currentStep}
                                        startingStep={currentStep}  
                                          
                                        height={10}
                                        width={300}

                                        steps={[
                                            {
                                                label:"Ai-evaluation",
                                                name:"step 1",
                                                content:<AiEval setStep={setCurrentStep}/>
                                            },
                                            {
                                                label:"Preview",                  
                                                name:"step 2",
                                                content:<Preview setStep={setCurrentStep}/>
                                            },
                                            {
                                                label:"Payments",         
                                                name:"step 3",
                                                content:<Payment setStep={setCurrentStep}/>
                                            }
                                        ]}
                                        labelClass="text-sm font-poppins whitespace-nowrap"
                                        primaryBtnClass={"hidden"}
                                        secondaryBtnClass="hidden"
                                        
                                        />
                        </div>
                </div>
      
            </div>
              </>
              ) 
              }
              export default Eval