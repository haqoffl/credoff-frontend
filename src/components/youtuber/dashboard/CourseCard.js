import { Copy,  Pencil, Share2, Trash, XCircle } from "lucide-react";
import { useState } from "react";
import {FacebookIcon,FacebookShareButton, TelegramIcon, TelegramShareButton,WhatsappIcon,WhatsappShareButton, EmailShareButton, EmailIcon, TwitterShareButton, TwitterIcon}from'react-share'
import axios from 'axios'
export default function CourseCard({thumbnail,title,desc,te,ic,tubeId}){
let [shareVis,setShareVis] = useState(false)
    let copyTubeLink = async(text)=>{
try{
    await navigator.clipboard.writeText(process.env.REACT_APP_URL+"creds/"+text)
    alert("text copied")

}catch(err){
alert("browser not support")
}       
    }

    let deleteTube = ()=>{
        axios.delete(process.env.REACT_APP_BACKEND_URL+"tube/deleteTube/"+tubeId).then((res)=>{
            alert("deleted")
            window.location.reload()
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    

    return(
        <>
  
        <div className="group border w-full md:w-[40%] lg:w-[30%] font-poppins rounded-lg relative">
<div className="group-hover:opacity-50">
<div className="absolute w-3/4 right-2 top-2 hidden group-hover:block">
{shareVis?(<div className="flex justify-end gap-2">
<span className="cursor-pointer bg-slate-50 rounded-full p-1 size-8 text-red-600" onClick={()=>{setShareVis(!shareVis)}}><XCircle /></span>
<span ><WhatsappShareButton url={process.env.REACT_APP_URL+"creds/"+tubeId}><WhatsappIcon className="rounded-full size-8"/></WhatsappShareButton></span>
<span><FacebookShareButton url={process.env.REACT_APP_URL+"creds/"+tubeId}><FacebookIcon  className="rounded-full size-8" /></FacebookShareButton></span>
<span><TelegramShareButton url={process.env.REACT_APP_URL+"creds/"+tubeId}><TelegramIcon  className="rounded-full size-8" /></TelegramShareButton></span>
<span><TwitterShareButton url={process.env.REACT_APP_URL+"creds/"+tubeId}><TwitterIcon  className="rounded-full size-8"/></TwitterShareButton></span>
<span><EmailShareButton url={process.env.REACT_APP_URL+"creds/"+tubeId}><EmailIcon  className="rounded-full size-8" /></EmailShareButton></span>
</div>):<div className="flex justify-end gap-2">
<span className="cursor-pointer bg-slate-50 rounded-full p-1" onClick={()=>{deleteTube()}}><Trash className="p-1 text-red-600"/></span>
<span  className="cursor-pointer  bg-slate-50 rounded-full p-1" onClick={()=>{copyTubeLink(tubeId)}}><Copy className="p-1"/></span> 
<span  className="cursor-pointer  bg-slate-50 rounded-full p-1" onClick={()=>{setShareVis(!shareVis)}}><Share2 className="p-1"/></span>
<span  className="cursor-pointer  bg-slate-50 rounded-full p-1"><Pencil className="p-1"/></span>

</div>}


</div>
<img src={process.env.REACT_APP_BACKEND_URL+thumbnail}  alt="thumbnail" className="w-full rounded-t-lg"/>

</div>
<div className="mt-3 p-2">
<b className="mb-1 block text-base">{title}</b>
<p className="font-notoSans font-light text-sm">{desc}...</p>
{/*details */}
<ul className="flex justify-between mt-5 font-notoSans text-xs">
<li className="text-green-600 ">Total Earnings: {te}</li>
<li className="text-primary">{ic} Issued Certificates</li>
</ul>

</div>
</div>
        </>
    )
}