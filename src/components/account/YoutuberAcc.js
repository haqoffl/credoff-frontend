import * as yup from 'yup'
import { useFormik } from 'formik'
import axios  from 'axios'
import { useState } from 'react'
import {toast} from 'react-toastify'
function YoutuberAcc(){
let [loading,setLoading] = useState(false)
    let formik = useFormik({
        initialValues:{
            fullName:"",
            youtubeChannelName:"",
            channelURL:"",
            language:""
        },
        validationSchema: yup.object({
           fullName: yup.string(),
           youtubeChannelName:yup.string(),
           channelURL:yup.string(),
           language:yup.string()
          
        }),
        onSubmit:(data)=>{
            setLoading(true)
            let id = localStorage.getItem('youtuberId')
            axios.post(process.env.REACT_APP_BACKEND_URL+"users/updateYoutuber",{id,fullName:data.fullName,channelName:data.youtubeChannelName,channelURL:data.channelURL,language:data.language}).then(res=>{
                console.log(res)
                toast.success(res.data.message)
                setLoading(false)
            }).catch(err=>{
                console.log(err)
                toast.error("something went wrong,try again later")
                setLoading(false)
            })
        }
    })

    return(
        <>
           <form className='font-poppins ' onSubmit={formik.handleSubmit}>

<div className='mt-5 '>
<label>Github username</label>
<input type="text" placeholder='github username' disabled value="github username" className='disabled:text-gray-600 disabled:bg-gray-50 border py-3 ps-2 rounded-lg block outline-none'/>
</div>

<div className='mt-5 '>
<label>full name</label>
<input type="text" placeholder='full name' name='fullName' value={formik.values.fullName} onChange={formik.handleChange} className='border py-3 ps-2 rounded-lg block outline-none'/>
</div>

<div className='mt-5 '>
<label>youtube channel name</label>
<input type="text" placeholder='youtube channel name' name="youtubeChannelName" value={formik.values.youtubeChannelName} onChange={formik.handleChange}   className='border py-3 ps-2 rounded-lg block outline-none'/>
</div>

<div className='mt-5 '>
<label>channel URL</label>
<input type="text" placeholder='channel URL' name="channelURL" value={formik.values.channelURL} onChange={formik.handleChange}  className='border py-3 ps-2 rounded-lg block outline-none'/>
</div>

<div className='mt-5 '>
<label>Language</label>
<input type="text" placeholder='Language' name="language" value={formik.values.language} onChange={formik.handleChange}  className='border py-3 ps-2 rounded-lg block outline-none'/>
</div>
<div >
<button disabled={loading} className='bg-primary block text-white mt-3 mb-5 p-3 w-full'><span>{loading?"loading...":"update"}</span></button>

</div>

</form>
        </>
    )
}
export default YoutuberAcc