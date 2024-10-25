import { CirclePlus, InfoIcon, Mail } from "lucide-react"
import Search from "../../../components/ui/Search"
import { useState } from "react"

function Dashboard(){
    let [tubes,setTubes] = useState([])
    return(
        <>
      <div className="container mx-auto">
{tubes.length === 0?null:<Search classes="w-10/12 mt-5 ms-5 lg:hidden"/>}
     <div className="mt-10 flex justify-end mr-20">
<button className="bg-primary text-white p-2 rounded-lg text-sm">Create Tube & Earn Certificates <CirclePlus className="inline ms-2 text-sm"/></button>
     </div>

     <div className="mt-10">
<div className="flex justify-center mb-10">
<div className=" w-10/12 lg:w-6/12 p-3 md:p-10 text-center border rounded-lg font-poppins bg-yellow-100">
<p className="text-yellow-400 font-semibold"><InfoIcon className="inline me-2 text-yellow-100 bg-yellow-400 rounded-full"/>Limited Access in Beta Version</p>

<div className="mt-5 font-light">
    <span>Thank you for using the beta version of our application! We're excited to have you on board. However, please note that the validation round for your YouTube course to issue certificates is currently restricted. If you're eager to access this feature, kindly reach out to us via email for further assistance.
Please be aware that if you generate validation links without our consent, we are not responsible for any revenue or outcomes from such actions.
</span>

<p className="text-yellow-400 font-semibold mt-5"><Mail className="inline mr-3"/>support@credoff.com or haq.dist@gmail.com</p>

</div>

</div>
</div>
     </div>
      </div>
        </>
    )
}
export default Dashboard