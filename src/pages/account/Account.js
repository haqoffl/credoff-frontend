import Lottie from 'lottie-react'
import update from '../../assets/lottie/update.json'
import { useEffect } from 'react'
import {useParams } from 'react-router-dom'
import LearnerAcc from '../../components/account/LearnerAcc'
import YoutuberAcc from '../../components/account/YoutuberAcc'
function Account(){
    let {role} = useParams()
    useEffect(()=>{
       console.log(role)
       if(role === 'youtuber'){

       }else if(role === "learner"){

       }else{

       }

    })
    return(
        <>
    <div className='bg-primary text-white text-center w-full font-poppins p-1 fixed top-0 lg:top-auto lg:lg:-bottom-1 z-50'><span className='block text-xs ms-1'>To update a specific field, simply fill in the desired field and click the Update button.</span>
           </div>
       <div className="container">
     
        <h1 className='font-poppins text-primary lg:text-3xl text-lg ms-5 mt-14 font-bold mb-5'>Credoff</h1>
        <div className='flex'>
            <div className='hidden lg:block lg:w-6/12'>
            <Lottie animationData={update} loop={true}/>
            </div>
            <div className='flex justify-center w-full lg:w-6/12'>
        <div>
        <p className='font-poppins font-semibold text-xl'>Account Settings</p>
    {
        role === "learner"?  <LearnerAcc />:<YoutuberAcc />

    }
        
        </div>
            </div>
        </div>
       </div>
        </>
    )
}
export default Account