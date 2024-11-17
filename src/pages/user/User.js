import { useNavigate,useParams } from "react-router-dom"
import GitCard from "../../components/ui/GitCard"
import { useEffect, useState } from "react"
import axios from "axios"
function User(){
    let nav =  useNavigate()
    let {learnerId,tubeId,type} = useParams()
    let [data,setData] = useState()
    let [selectedGit,setSelectedGit] = useState()
    let [tubes,setTubes] = useState([])
    let [otherCertificates,setOtherCertificates] = useState([])
    useEffect(()=>{
      axios.get(process.env.REACT_APP_BACKEND_URL+"certificate/getCertificate/"+learnerId+"/"+tubeId).then(res=>{
          console.log(res.data)
          setData(res.data)
      }).catch(err=>console.log(err))
    },[])

    useEffect(()=>{
       if(type==="verify"){
        axios.get(process.env.REACT_APP_BACKEND_URL+"certificate/getAllCertificates/"+learnerId).then(res=>{
            console.log("all certificate",res.data)
            setOtherCertificates(res.data)
        }).catch(err=>console.log(err))
       } 

       else if(type==="share"){
           axios.get(process.env.REACT_APP_BACKEND_URL+"tube/getTubes").then(res=>{
           setTubes(res.data)
           }).catch(err=>console.log(err))
       }

       else{
        nav('/')
       }
    },[])
    return(
        <>
              

       {!data?null:<div className="container mx-auto">
       <h1 className="sticky right-0 top-0 left-0  z-50 bg-white border-b pb-2 pt-2 font-poppins text-2xl font-semibold mt-5  text-primary ps-5">Credoff</h1>
{/* basic  details */}
<div className="mb-7">
<div className="flex justify-center mt-5">
    <div>
    <img src="https://avatars.githubusercontent.com/u/91720352" className="w-24 h-24 rounded-full"/>
    <p className="font-poppins text-sm mt-2">{data.learnerName}</p>
    </div>
    
</div>
<div className="flex justify-center">
<div className="w-full lg:w-8/12">
<p className="text-center font-poppins mt-5">Compeletion of</p>
<p className="font-poppins font-semibold ps-5 text-sm mt-1 lg:text-center">{data.tubeName}</p>
</div>
</div>
<div className="flex justify-center  pb-2">
    
    <div className="flex justify-around mt-7  w-full lg:w-8/12">
   
        <div>
            <p className="font-notoSans text-center text-sm">{data.scoredAtQuiz}/15
                </p>
                <p className="font-poppins font-semibold">Quiz Score</p>
        </div>
        <div>
            <p className="font-notoSans text-center text-sm">{data.scoredOnAiEvaluationAtProject}/15</p>
            <p className="font-poppins font-semibold">AI Score</p>
            </div>
        <div>
            <p className="font-notoSans text-center text-sm">{data.language}</p>
            <p className="font-poppins font-semibold">Language</p>
            </div>
    </div>
</div>

</div>
{/* github project */}
 <div className="flex justify-center ">
    <div className="w-full lg:w-8/12  pb-2 border-t pt-5 ">
    <p className="ms-4 font-poppins font-semibold text-gray-400">Submitted Project</p>
  <div onClick={()=>{window.open(data.git_url,"_blank")}}>
  <GitCard key={0} repo={{owner:{avatar_url:"https://avatars.githubusercontent.com/u/91720352"},full_name:data.git_fullName,description:data.git_description,language:data.git_language,stargazers_count:data.git_stars,forks_count:data.git_forks,visibility:data.git_visibility,pushed_at:data.git_pushed_at,html_url:data.git_url}} setState={setSelectedGit} state={selectedGit}/>
  </div>
    </div>
 </div>

{/* featured tubes or other certificates */}
 <div className="flex justify-center">
    <div className="w-full lg:w-8/12 mt-3">
    <p className="ms-4 font-poppins font-semibold text-gray-400">{type==="verify"?"Other Certificates":"Featured Tubes"}</p>
    <div className="flex flex-wrap">
{tubes.length === 0 && type==="share"?<p>No Tubes are found</p>:tubes.map((tube,i)=>{
    return(
        <div className="w-full lg:w-4/12 p-2 cursor-pointer" onClick={()=>nav("/creds/"+tube._id)}>
        <img src={process.env.REACT_APP_BACKEND_URL+"thumbnail/"+tube.thumbnail} className="w-full rounded"/>
        
        </div>
    )
})}

{otherCertificates.length === 0 && type==="verify"?null:otherCertificates.map((certificate,i)=>{
      if(certificate.tubeId !== tubeId){  
        return (
         <div className="w-full lg:w-4/12 p-2 cursor-pointer" >
         <img src={process.env.REACT_APP_BACKEND_URL+"thumbnail/"+certificate.thumbnail} className="w-full rounded"/>
         
         </div>
        )
        }else{
            return <p className=" ms-5 text-center font-notoSans text-lg mb-10">No other certificates are there!</p>
        }
})}

    </div>
    </div>
    
 </div>
       </div>}
        </>
    )
}

export default User