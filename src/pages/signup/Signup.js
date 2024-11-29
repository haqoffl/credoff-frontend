
import UserForm from '../../components/signup/UserForm'
import YoutuberForm from '../../components/signup/YoutuberForm'
import {useEffect, useState} from 'react'
import {TypeAnimation} from 'react-type-animation'
import {CircleUserRound, Youtube} from 'lucide-react'
import axios from 'axios'
import {Helmet} from "react-helmet";
import {useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
function Signup(){
    let [role,setRole] = useState(false)
    let nav = useNavigate()
    
useEffect(()=>{

    let q = new URLSearchParams(window.location.search)
    console.log(q)
     let code = q.get('code')
     let accessTokenThere = localStorage.getItem('github_access_token')
if(!accessTokenThere && code){


    axios.get(process.env.REACT_APP_BACKEND_URL+"users/logViaGithub/reqAccessToken/"+process.env.REACT_APP_GITHUB_CLIENT_ID+"/"+code+"/").then(res=>{
        let r = res.data
        let q = new URLSearchParams(r);
        let access_token = q.get("access_token")
        let token_type = q.get("token_type") 
        let isError = q.get("error")
       

       if(isError){
alert(isError)
       }else{
       
try{
    let y_data = JSON.parse(localStorage.getItem('youtuberData'))
    let l_data = JSON.parse(localStorage.getItem("learnerData"))
console.log(y_data,l_data)
    if(y_data){
        console.log("going to create youtube")
       axios.post(process.env.REACT_APP_BACKEND_URL+"users/createAccount/youtuber",{...y_data,oauthToken:access_token}).then(res=>{
           
           console.log(res)
      if(res.status===200){
        localStorage.setItem("youtuberId",res.data.youtuberId)
        localStorage.setItem("github_id",res.data.github_id)
        localStorage.setItem("github_node_id",res.data.github_node_id)
        localStorage.setItem("github_access_token",access_token)
        localStorage.setItem("github_token_type",token_type)
        setTimeout(()=>{
            nav('youtuber/dashboard')  
       },1000)
      }else{
        console.log("it trigger")
        toast.info(res.data)
      }
         }).catch(err=>{
           console.log(err)
           toast.error("something went wrong,try again later")
            
         })
    }

    if(l_data){
        console.log("going to create learner")

        axios.post(process.env.REACT_APP_BACKEND_URL+"users/createAccount/learner",{...l_data,oauthToken:access_token}).then(res=>{  
            console.log(res.data)         
            
             if(res.status===200){
                localStorage.setItem("github_access_token",access_token)
                localStorage.setItem("github_token_type",token_type)
                localStorage.setItem("github_id",res.data.github_id)
                localStorage.setItem("github_node_id",res.data.github_node_id)
                 localStorage.setItem("learnerId",res.data.learnerId)
                setTimeout(()=>{
                    nav('youtuber/dashboard')  
               },1000)
              }else{
                toast.info(res.data)
              }
          

          }).catch(err=>{
            console.log(err)
            toast.error("something went wrong,try again later")
          })
    }
}catch(err){
    console.log(err)
}

 

       }
     }).catch(err=>{
        console.log(err)
     })
}


     
},[])
    return(
        <>

<div className="container mx-auto">
<Helmet>
                <meta charSet="utf-8" />
                <title>Credoff - Turn YouTube Learning into Real Credentials</title>
                <meta property="og:title" content={`Credoff - Turn YouTube Learning into Real Credentials}`} />
                <meta property="og:description" content={"Credoff - Turn YouTube Learning into Real Credentials"} />
                <meta property="og:image" content={process.env.REACT_APP_BACKEND_URL+"thumbnail/"+"4fht53wzm3fkwfhj"} />
                <meta property="og:url" content={window.location.href} />

            </Helmet>
        <div className="lg:flex">
            <div className="lg:hidden bg-primary p-2 text-white font-poppins">
            <h1 className="text-xl mt-1 ms-[10px]">Credoff</h1>
            </div>
{/* welcome content */}
<div className="hidden lg:block bg-primary relative text-white font-poppins p-5 my-5 mx-5 h-[90vh] rounded-2xl ">
<h1 className="ms-[10px]">Credoff</h1>
<div className="mt-20">
    <h2 className="text-4xl font-semibold slogan">
        <span>Turn YouTube </span>
    
    <span>Learning into Real </span>
    <TypeAnimation 
    sequence={[
        "Credoff",
        2000,
        "Credits",
        2000,
        "Credentials",
        2000
    ]
}
wrapper='span'
speed={20}
repeat={Infinity}
    />
        </h2>
</div>

<div className="flex text-xs justify-around absolute w-full bottom-5 right-1">
<div><p className="terms">Terms & Conditions.</p></div>
<div><p className="terms">Policies.</p></div>
<div><p className="terms">Help & Queries.</p></div>

</div>
</div>
{/* login form */}

<div className="font-poppins p-5 lg:p-0 my-5 md:mx-5 h-[90vh] lg:w-6/12 w-full">
<h3 className="text-3xl  text-primary mt-10 font-semibold">Sign up</h3>
<p>Have an account in credoff</p>

{/* types of user */}
<div className="mt-5 font-notoSans ">
<span className="font-semibold">What type of user you are ? </span>
<div className="flex justify-between  gap-2 mt-3">

<button  onClick={()=>{setRole(false)}} className={`border p-2 w-6/12 md:w-5/12 text-center rounded-xl hover:cursor-pointer hover:shadow-primary ${!role? "text-white bg-primary":"text-black bg-white"}`}>
<span className="font-semibold"><CircleUserRound className='hidden md:inline h-[25px] w-[25px]  me-3 '/> I am a learner</span>
</button>

<button onClick={()=>{setRole(true)}}  className={`border p-2 w-6/12 md:w-5/12 text-center rounded-xl hover:cursor-pointer  ${role? "text-white bg-primary":"text-black bg-white"}`}>
<span className="font-semibold"> <Youtube className='hidden md:inline h-[25px] w-[25px]  me-3 '/>I am a youtuber</span>

</button>
</div>
</div>
<div>{role === true?<YoutuberForm />:<UserForm />}
</div>

<div className='text-center mt-5 mb-5 border-t-2'>
    <p onClick={()=>{nav('/login')}} className='text-gray-500 mt-5'>already have an account?<span className='text-primary hover:cursor-pointer hover:underline'> click here</span></p>
    {/* <button className="bg-black mt-4 md:mt-3 md:w-6/12 w-full rounded-lg p-2 text-white"><img src={github} className='h-[20px] w-[20px] inline me-3' alt='github'/>Login via Github</button> */}

</div>

</div>
        </div>
        </div>
        <ToastContainer />
        </>
    )
}

export default Signup