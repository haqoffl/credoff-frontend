import LearnerNavbar from "../../components/layout/LearnerNavbar"
import Lottie from 'lottie-react'
import letstart from '../../assets/lottie/letstart.json'
import CourseCard from "../../components/youtuber/dashboard/CourseCard"
import Footer from "../../components/layout/Footer"
import { useEffect, useState } from "react"
import axios from 'axios'

import CertificateCard from "../../components/learner/home/CertificateCard"
import Spinner from "../../components/ui/Spinner"
import { useNavigate } from "react-router-dom"
import { use } from "../../../../api/routers/tube"
function Home() {
  let [certificates,setCertificates] = useState([])
  let [recentTubes,setRecentTubes] = useState([])
  let [loading,setLoading] = useState(true)
  let nav = useNavigate()
  useEffect(()=>{
    axios.get(process.env.REACT_APP_BACKEND_URL+"certificate/getAllCertificates/"+localStorage.getItem('learnerId')).then(res=>{
      console.log(res.data)
      setLoading(false)
      setCertificates(res.data)
    }).catch(err=>{
      alert("something went wrong")
      console.log(err)
    })
  },[])

  useEffect(()=>{
    axios.get(process.env.REACT_APP_BACKEND_URL+"tube/getTubes").then(res=>{
      console.log(res.data)
      setRecentTubes(res.data)
      setLoading(false)
    }).catch(err=>{
      console.log(err)
      alert("something went wrong")
    })
  },[])



    return (
        <>
        {loading?<div className="mt-20 text-center"><Spinner sizeClass={"size-40"}/></div>:<div>
            <LearnerNavbar />
          
            
           <div className="container">
          {certificates.length===0?<><div className="flex justify-center mt-5 mb-5">
            <div className="w-10/12 lg:w-4/12">
            <Lottie
            animationData={letstart}
            loop={true}
            
            />
            <p className="text-gray-400 font-poppins text-center text-sm">Welcome to Credoff! Kickstart your learning journey today!</p>
            </div>
          </div>  
          
        </>:(
            <div className="container mx-auto mt-10 mb-10">
              <p className="ms-5 font-poppins">You have ({certificates.length}) Documents</p>
              {certificates.map((val,i)=>{
                return(
                  <CertificateCard courseTitle={val.tubeName} thumbnail={val.thumbnail}  channelName={val.youtuberChannelName} isMinted={val.isMinted} _id={val.tubeId}/>

                )
              })}


            </div>
          )}

        
           </div>
          {recentTubes.length ==0?null: <div className="mx-10 mt-20 mb-10 border-t pt-3">
            <p className="mb-3 font-poppins">Recent tubes</p>
           
<div className="flex flex-wrap">
{
  recentTubes.map((val,i)=>{
    return (
<>
<div className="w-full lg:w-1/4 p-2 cursor-pointer" onClick={()=>nav("/creds/"+val._id)}>
<img src={process.env.REACT_APP_BACKEND_URL+"thumbnail/"+val.thumbnail} className="w-full "/>

</div>

</>

    )
  })
}
</div>

          </div>}
          <Footer />
        </div>}
        </>
    )
}

export default Home