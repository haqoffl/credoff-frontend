import * as yup from 'yup'
import { useFormik } from 'formik'
import axios  from 'axios'
function YoutuberAcc(){

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
            let id = localStorage.getItem('youtuberId')
            axios.post(process.env.REACT_APP_BACKEND_URL+"users/updateYoutuber",{id,fullName:data.fullName,channelName:data.youtubeChannelName,channelURL:data.channelURL,language:data.language}).then(res=>{
                console.log(res)
                alert(res.data.message)
            }).catch(err=>{
                console.log(err)
            })
        }
    })

    return(
        <>
           <form className='font-poppins ' onSubmit={formik.handleSubmit}>

<div className='mt-5 '>
<label>Github username</label>
<input type="text" placeholder='github username'  className='border py-3 ps-2 rounded-lg block outline-none'/>
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
<button className='bg-primary block text-white mt-3 mb-5 p-3 w-full'>Update</button>

</div>

</form>
        </>
    )
}
export default YoutuberAcc