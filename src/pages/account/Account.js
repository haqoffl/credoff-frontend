import Lottie from 'lottie-react'
import update from '../../assets/lottie/update.json'
import { useEffect } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import LearnerAcc from '../../components/account/LearnerAcc'
import YoutuberAcc from '../../components/account/YoutuberAcc'
import axios from 'axios'
import Spinner from '../../components/ui/Spinner'
import {useState} from "react"
import { ToastContainer, toast } from 'react-toastify';

function Account(){
    let {role} = useParams()
    let nav = useNavigate()
    let [loading,setLoading] = useState(true)
    useEffect(()=>{
       console.log(role)
       let isGithubIdThere = localStorage.getItem('github_id')
       let isGithubAccessTokenThere = localStorage.getItem('github_access_token')
       if(role==="youtuber"){
            let isYoutuberIdThere = localStorage.getItem('youtuberId')
            if(!isYoutuberIdThere || !isGithubIdThere || !isGithubAccessTokenThere){
                nav('/')
            }else{
                    axios.post(process.env.REACT_APP_BACKEND_URL+"users/validateYoutuber",{id:isYoutuberIdThere,oauthToken:isGithubAccessTokenThere}).then(res=>{
                        setLoading(false)
                        toast("let's edit your account")
                    }).catch((err)=>{
                        nav('/')
                    })
            }
           
       }
       else if(role==="learner"){
        let isLearnerIdThere = localStorage.getItem('learnerId')
        if(!isLearnerIdThere || !isGithubIdThere || !isGithubAccessTokenThere){
            nav('/')
        }else{
            axios.post(process.env.REACT_APP_BACKEND_URL+"users/validateLearner",{id:isLearnerIdThere,oauthToken:isGithubAccessTokenThere}).then(res=>{
                setLoading(false)
                toast("let's edit your account")
            }).catch((err)=>{
                nav('/')
            })
        }
      
       }
       else{
        nav('/')
   }

    },[])
    return(
        <>
  {loading?<div className='mt-5 justify-center flex'>
    <Spinner sizeClass={"size-40"}/>
  </div>:<>  <div className='bg-primary text-white text-center w-full font-poppins p-1 fixed top-0 lg:top-auto lg:lg:-bottom-1 z-50'><span className='block text-xs ms-1'>To update a specific field, simply fill in the desired field and click the Update button.</span>
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
       </div></>}
  <ToastContainer />
        </>
    )
}
export default Account