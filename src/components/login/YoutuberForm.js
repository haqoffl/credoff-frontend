import github from '../../assets/svg/github.svg'
import {useFormik} from 'formik'
import * as yup from 'yup'
function YoutuberForm(){

let formik = useFormik({
    initialValues:{
        youtuberName:"",
        channelName:"",
        channelURL:"",
        language:""
    },
    validationSchema: yup.object({
        youtuberName:yup.string().required("your name is required!"),
        channelName:yup.string().required("your channel name is required"),
        channelURL:yup.string().matches(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
        "Please enter a valid YouTube URL").required("youtube channel url is required"),
        language:yup.string().required("language is required")

    }),
    onSubmit:(data)=>{
        console.log(data)
       localStorage.setItem('youtuberData',JSON.stringify({fullName:data.youtuberName,channelName:data.channelName,channelURL:data.channelURL,language:data.language}) )
setTimeout(()=>{
    window.location.assign("https://github.com/login/oauth/authorize/?client_id="+process.env.REACT_APP_GITHUB_CLIENT_ID+"&allow_signup=true")

},1000)     
    }
})

    return(
        <form className="font-notoSans mt-5" onSubmit={formik.handleSubmit}>
        <label className="block font-semibold">Enter your Name:</label>
        <input type="text" placeholder="Enter your name" className="block border border-gray-300   p-2 rounded-lg  mt-2 outline-none w-full ps-4" name='youtuberName' onChange={formik.handleChange} value={formik.values.youtuberName}/>
        {formik.errors.youtuberName?<p className='text-red-700'>{formik.errors.youtuberName}</p>:null}
        <label className="block font-semibold mt-3">youtube channel name:</label>
        <input type="text" placeholder="your channel name" className="block border border-gray-300   p-2 rounded-lg  mt-2 outline-none w-full ps-4" name='channelName' onChange={formik.handleChange} value={formik.values.channelName}/>
        {formik.errors.channelName?<p className='text-red-700'>{formik.errors.channelName}</p>:null}
        <label className="block mt-3 font-semibold">Channel URL:</label>
        <input type="text" placeholder="Paste your channel URL" className="block border border-gray-300   p-2 rounded-lg  mt-2 outline-none w-full ps-4" name='channelURL' onChange={formik.handleChange} value={formik.values.channelURL}/>
        {formik.errors.channelURL?<p className='text-red-700'>{formik.errors.channelURL}</p>:null}
        <label className="block mt-3 font-semibold">channel Language:</label>
        <select className="block border border-gray-300   p-2 rounded-lg  mt-2 outline-none w-full ps-4" name='language' onChange={formik.handleChange} value={formik.values.language}>
<option value="">Choose your channel language</option>
<option value="hindi">Hindi</option>
<option value="tamil">Tamil</option>
<option value="telugu">Telugu</option>
<option value="bengali">Bengali</option>
<option value="marathi">Marathi</option>
<option value="kannada">Kannada</option>
<option value="malayalam">Malayalam</option>
<option value="gujarati">Gujarati</option>
<option value="punjabi">Punjabi</option>
<option value="odia">Odia</option>
<option value="assamese">Assamese</option>
<option value="urdu">Urdu</option>

        </select>
        {formik.errors.language?<p className='text-red-700'>{formik.errors.language}</p>:null}
    <button className="bg-black mt-4 md:mt-3 md:w-6/12 w-full rounded-lg p-2 text-white"><img src={github} className='h-[20px] w-[20px] inline me-3' alt='github'/>Create Account via Github</button>
    </form>
    )
}

export default YoutuberForm