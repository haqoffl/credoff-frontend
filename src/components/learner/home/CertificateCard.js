import { CircleAlert, Download, ExternalLink, Share } from "lucide-react"
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share"
import { useNavigate } from "react-router-dom"
function CertificateCard({courseTitle,isPayedCertificate,thumbnail,channelName,isMinted,_id}) {
  let nav = useNavigate()
  let proceed = ()=>{
    sessionStorage.setItem('youtuberTube',JSON.stringify({title:courseTitle,thumbnail,isPayedCertificate,_id}))
setTimeout(() => {
  window.open('/pay', '_blank');
},1000)
  }
    return(
        <>
           <div className="mt-5 mb-5 flex justify-center">
                <div className="lg:flex w-9/12 gap-4 border rounded-lg">
                <div className="lg:w-3/12">
                  <img className="w-full h-full rounded-t lg:rounded-l" src={process.env.REACT_APP_BACKEND_URL+"thumbnail/"+thumbnail}/>
                </div>
                <div className="lg:w-9/12 mt-5 lg:mt-0">
                  <p className="font-poppins font-light ms-2">{courseTitle}</p>
                  <span className="font-notoSans block mt-2 mb-2 text-gray-500 ms-2">Course by {channelName}</span>
                 { isMinted?<div className="ms-2 flex gap-4 mt-2 mb-2">
                        <p ><WhatsappShareButton url={process.env.REACT_APP_URL+"user/"+localStorage.getItem('learnerId')+"/"+_id+"/share"}><WhatsappIcon className="rounded-full size-6 cursor-pointer"/></WhatsappShareButton></p>
                        <p ><FacebookShareButton  url={process.env.REACT_APP_URL+"user/"+localStorage.getItem('learnerId')+"/"+_id+"/share"}><FacebookIcon className="rounded-full size-6 cursor-pointer"/></FacebookShareButton></p>
                        <p ><TwitterShareButton  url={process.env.REACT_APP_URL+"user/"+localStorage.getItem('learnerId')+"/"+_id+"/share"}><TwitterIcon className="rounded-full size-6 cursor-pointer"/></TwitterShareButton></p>
                        <p  onClick={()=>{nav("/certificate/"+_id+"/"+localStorage.getItem('learnerId'))}}><Download className="size-6 cursor-pointer"/></p>
                  </div>:<><span className="text-red-500 bg-red-200 px-2 text-center mt-2 inline-block w-full mb-2 "><CircleAlert className="inline me-2 size-4"/> not issued</span>
                    <div className="flex">
                    <button className="bg-primary block text-white px-2 py-1 w-full mt-2 " onClick={proceed}>Proceed now  <ExternalLink className="inline ms-2"/></button>

                    </div></>}
                  
                  </div>
                </div>
              </div>
        </>
    )
}
export default CertificateCard