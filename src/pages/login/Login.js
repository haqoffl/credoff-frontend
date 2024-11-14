import Lottie from 'lottie-react'
import log from '../../assets/lottie/log.json'
import github from '../../assets/svg/github.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
function Login(){
let [role,setRole] = useState(null)

useEffect(()=>{
    let q = new URLSearchParams(window.location.search)
    console.log(q)
     let code = q.get('code')
     let accessTokenThere = localStorage.getItem('github_access_token')
if(!accessTokenThere && code){
    axios.get(process.env.REACT_APP_BACKEND_URL+"users/logViaGithub/reqAccessToken/"+process.env.REACT_APP_GITHUB_CLIENT_ID+"/"+code+"/").then((res)=>{

        let r = res.data
        let q = new URLSearchParams(r);
        let access_token = q.get("access_token")
        let isError = q.get("error")

      if(isError){
            alert(isError)
      }else{
        let isYoutuber = localStorage.getItem('youtuberData')
        if(isYoutuber){
            axios.post(process.env.REACT_APP_BACKEND_URL+"users/loginToCredoff/youtuber",{oauthToken:access_token}).then((resp)=>{
                localStorage.setItem("youtuberId",resp.data.youtuberId)
                localStorage.setItem("github_id",resp.data.github_id)
                localStorage.setItem("github_node_id",resp.data.github_node_id)
                localStorage.setItem("github_access_token",access_token)
                console.log(resp)
            }).catch(err=>{
                console.log(err)
            })
        }
        let isLearner = localStorage.getItem('learnerData')
        if(isLearner){
            axios.post(process.env.REACT_APP_BACKEND_URL+"users/loginToCredoff/learner",{oauthToken:access_token}).then((resp)=>{
            localStorage.setItem("learnerId",resp.data.learnerId)
            localStorage.setItem("github_id",resp.data.github_id)
            localStorage.setItem("github_node_id",resp.data.github_node_id)
            localStorage.setItem("github_access_token",access_token)
            }).catch(err=>{
                console.log(err)
            })
        }
      }
    }).catch(err=>{
        console.log(err)
    })
}
},[])
let loginWithGithub = ()=>{
if(!role){
    alert("select your role")
}else{
    if(role === "youtuber"){
        localStorage.setItem('youtuberData',"true") 
    }
    else{
        localStorage.setItem('learnerData',"true")
    }

  setTimeout(()=>{
    window.location.assign("https://github.com/login/oauth/authorize/?client_id="+process.env.REACT_APP_GITHUB_CLIENT_ID+"&allow_signup=true&redirect_uri="+process.env.REACT_APP_URL+"login")
  },2000)

}

}
    return(<>
    <div className="container mx-auto font-poppins mt-5">
    <h1 className="ms-3  text-primary font-semibold text-2xl">Credoff</h1>
        <div className="lg:flex">
            <div className="w-full lg:w-6/12">
                <Lottie animationData={log} loop={true}/>
            </div>

            <div className='w-full lg:w-6/12 p-10'>
               <div>
               <div className='font-semibold text-3xl lg:mt-20'>
                    <p>Welcome back</p>
                    <p>here.</p>
                </div>

                <div className='hidden lg:block mt-10'>
                    <p className='text-center text-gray-400 font-semibold'>Select your role here</p>
                    <div className='flex gap-2 justify-center mt-5'>
                    <button onClick={()=>{setRole("youtuber")}} className={`border ${role==="youtuber"?"bg-primary text-white":"border-black text-black"}  p-2 rounded-lg block w-5/12`}>Youtuber</button>
                
                    <button onClick={()=>{setRole("learner")}} className={`border ${role==="learner"?"bg-primary text-white":"border-black text-black"}  p-2 rounded-lg block w-5/12`}>Learner</button>
                    
               
                    </div>

                     </div>
                <div className='block lg:hidden'>
                    <select value={role} onChange={(e)=>{setRole(e.target.value)}} className='w-full mt-5 border bg-white p-2 '>
                        <option value={""}>Select your Role</option>
                        <option value={"youtuber"}>Youtuber</option>
                        <option value={"learner"}>Learner</option>
                    </select>
                </div>
                     <div className='flex justify-center'>
                     <button onClick={()=>{loginWithGithub()}} className="bg-black mt-5 w-full lg:mt-20 lg:w-10/12  rounded-lg p-2 text-white"><img src={github} className='h-[20px] w-[20px] inline me-3' alt='github'/>Login With Github</button>
                    
                     </div>
                    <span className='mt-5 text-center block'>Create an new Account ? <span className='text-primary'>Sign up</span></span>
               </div>
            </div>
        </div>
    </div>
    </>)
}
export default Login