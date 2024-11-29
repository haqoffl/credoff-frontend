import { InfoIcon, Mail } from "lucide-react"

export default function BetaWarn(){
    return(
        <>
        <div className="flex justify-center mb-10">
<div className=" w-10/12 lg:w-6/12 p-3 md:p-10 text-center border rounded-lg font-poppins bg-yellow-100">
<p className="text-yellow-400 font-semibold"><InfoIcon className="inline me-2 text-yellow-100 bg-yellow-400 rounded-full"/>Limited Access in Beta Version</p>

<div className="mt-5 font-light">
    <span>Thank you for using the beta version of our application! We're excited to have you on board. However, please note that the validation round for your YouTube course to issue certificates is currently restricted. If you're eager to access this feature, kindly reach out to us via email for further assistance.
Please be aware that if you generate validation links without our consent, we are not responsible for any revenue or outcomes from such actions.
</span>

<p className="text-yellow-400 font-semibold mt-5"><Mail className="inline mr-3"/> haq.dist@gmail.com</p>

</div>

</div>
</div>
        </>
    )
}