import * as yup from 'yup'
import { useFormik } from 'formik'
import axios from  'axios'
import {toast} from 'react-toastify'
import { useState } from 'react'
function LearnerAcc(){
    let [loading,setLoading] = useState(false)
    let formik = useFormik({
        initialValues:{
            fullName:"",
            dob:""
        },
        validationSchema: yup.object({
           fullName: yup.string(),
           dob:yup.date()
        }),
        onSubmit:(data)=>{
            setLoading(true)
            let id = localStorage.getItem('learnerId')
            axios.post(process.env.REACT_APP_BACKEND_URL+"users/updateLearner",{id,fullName:data.fullName,dob:data.dob}).then(res=>{
                console.log(res)
                toast.success(res.data.message)
                setLoading(false)
            }).catch(err=>{
                toast.error("something went wrong,try again later")
                console.log(err)
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
<input type="text" placeholder='full name' name='fullName' onChange={formik.handleChange} value={formik.values.fullName} className='border py-3 ps-2 rounded-lg block outline-none'/>
</div>

<div className='mt-5 '>
<label>Date Of Birth</label>
<input type="date" placeholder='youtube channel name' name="dob" onChange={formik.handleChange} value={formik.values.dob} className='border w-full py-3 ps-2 rounded-lg block outline-none'/>
</div>


<div >
<button disabled={loading} className='bg-primary block text-white mt-3 mb-5 p-3 w-full'><span>{loading?"updating...":"update"}</span></button>

</div>

</form>
        </>
    )
}

export default LearnerAcc