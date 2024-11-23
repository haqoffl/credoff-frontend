import { CirclePlus, PlusCircle} from "lucide-react"
import Search from "../../../components/ui/Search"
import { useEffect, useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import CourseCard from "../../../components/youtuber/dashboard/CourseCard"
import BetaWarn from "../../../components/youtuber/dashboard/BetaWarn"
import Spinner from "../../../components/ui/Spinner"
function Dashboard(){
    let [tubes,setTubes] = useState([])
    let [loading,setLoading] = useState(true)
    let nav = useNavigate()
    useEffect(()=>{
        let ownerId = localStorage.getItem('youtuberId')
        axios.get(process.env.REACT_APP_BACKEND_URL+"tube/getTubes/"+ownerId).then((res)=>{
                console.log(res.data)
                setLoading(false)
            setTubes(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

 let abbreviateNumber = (num)=>{
        if (num >= 1_000_000_000) {
            return (num / 1_000_000_000).toFixed(1) + " B";
        } else if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1) + " M";
        } else if (num >= 1_000) {
            return (num / 1_000).toFixed(1) + " K";
        } else {
            return num.toString();  // No abbreviation needed
        }
    }
    return(
        <>
      <div className="container mx-auto">
      {loading? <div className="mt-10 flex justify-center">
       <Spinner sizeClass={"size-40"}/>
       </div>:null}
{tubes.length === 0?null:<Search classes="w-10/12 mt-5 ms-5 lg:hidden"/>}
{tubes.length === 0 && loading===false? (<div>
<div className="mt-10 flex justify-end mr-20">
<Link to="/youtuber/create" className="bg-primary text-white p-2 rounded-lg text-sm">Create Tube & Earn Certificates <CirclePlus className="inline ms-2 text-sm"/></Link>
     </div>

     <div className="mt-10">
<BetaWarn />
     </div>
</div>):
(<div className="flex justify-center">
<div className="w-full md:w-10/12 flex gap-4 flex-wrap p-2 mt-10">
{/* card */}

{tubes.map((val)=>{
    let ic_a = abbreviateNumber(val.issued_certificate)
    let te_a = abbreviateNumber(Math.floor(val.earned_amount))
    let small_desc = val.desc.slice(0,80)
    return(
        <CourseCard title={val.title} desc={small_desc} thumbnail={"thumbnail/"+val.thumbnail} ic={ic_a} te={te_a} tubeId={val._id} isLearnerCard={false}/>
    )
})}

</div>

</div>)
}

<button disabled={loading} onClick={()=>{nav("/youtuber/create")}} className="bg-primary text-white p-2 rounded-full text-sm fixed right-[10%] bottom-[10%]"><PlusCircle className="inline"/></button>
      </div>
        </>
    )
}
export default Dashboard