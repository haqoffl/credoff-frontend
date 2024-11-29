import { Copy } from 'lucide-react';
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
export default function Payment({setStep}){
    let nav = useNavigate()
    let [loading,setLoading] = useState(false)
    useEffect(() => {
            if(JSON.parse(sessionStorage.getItem('youtuberTube')).isPayedCertificate == true){
                const script = document.createElement('script');
                script.src = "https://checkout.razorpay.com/v1/payment-button.js";
                script.setAttribute('data-payment_button_id', 'pl_PHhpNhKqnDLliB'); // Use your provided payment button ID
                script.async = true;
                document.getElementById('razorpay-button-container').appendChild(script);
                        return () => {
                    document.getElementById('razorpay-button-container').removeChild(script);
                };
            }
       
    }, [setStep]);

    let copyTubeLink = async(text)=>{
        setLoading(true)
        try{
            let data = localStorage.getItem('learnerId')+"-"+JSON.parse(sessionStorage.getItem('youtuberTube'))._id
            await navigator.clipboard.writeText(data)
            alert("text copied")
            setLoading(false)
        
        }catch(err){
        setLoading(false)
        alert("browser not support")
        }       
            }

            let freePayments = ()=>{
                let data = {
                    learnerId:localStorage.getItem('learnerId'),
                    tubeId:JSON.parse(sessionStorage.getItem('youtuberTube'))._id
                }
                axios.post(process.env.REACT_APP_BACKEND_URL+"payments/free",data).then(res=>{
                    console.log(res.data)
                    nav('/')
                }).catch(err=>{
                    alert("something went wrong")
                    console.log(err)
                })
            }

    return (
      <div>

        <div className='flex justify-center'>
    <div className='w-ful lg:w-6/12'>
    <h1 className='font-poppins text-primary  text-lg ms-5 mt-14 font-bold mb-5'>Credoff Course Detail</h1>
          <div className='w-full'>
          <img src={process.env.REACT_APP_BACKEND_URL+"thumbnail/"+JSON.parse(sessionStorage.getItem('youtuberTube')).thumbnail} className='w-full rounded-lg mb-5'/>

<h1 className='font-poppins font-light mb-5'>{JSON.parse(sessionStorage.getItem('youtuberTube')).title}</h1>

          </div>
    </div>
        </div>
{JSON.parse(sessionStorage.getItem('youtuberTube')).isPayedCertificate?<><span className='text-gray-400 text-center block'>Note: copy this certificate ID to pay for this course</span>
    <p onClick={()=>copyTubeLink()} className='text-primary font-poppins text-center mt-5 mb-5 text-sm bg-slate-200 lg:bg-transparent p-1 rounded-lg'>{localStorage.getItem('learnerId')}-{JSON.parse(sessionStorage.getItem('youtuberTube'))._id} <Copy className='ms-2 inline cursor-pointer'/></p></>:null}
        {JSON.parse(sessionStorage.getItem('youtuberTube')).isPayedCertificate?
         <div className='flex justify-end border-t'>
<div className='w-full lg:w-4/12 text-end lg:text-center'>
<p className='mt-5 text-gray-600 font-poppins'>price: <span className='ms-1 font-notoSans text-4xl font-semibold text-black'>₹199</span> only.</p>
<span className='mt-1 mb-2 block text-gray-600 font-poppins text-sm'>(GST included)</span>
<form id="razorpay-button-container" className=''>
            {/* The Razorpay payment button will be injected here */}
        </form>
</div>
</div> :<div>
    <button disabled={loading} onClick={()=>{freePayments()}} className='bg-primary text-white px-5 py-2 mt-5 rounded-lg float-right'>{loading?"loading...":"Mint your free certificate"}</button>

    </div>}
      </div>

    );
};

