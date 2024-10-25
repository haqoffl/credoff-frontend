import github from '../../assets/svg/github.svg'
import {useFormik} from 'formik'
import * as yup from 'yup'
function UserForm(){
    let formik = useFormik({
        initialValues:{
            name:"",
            dob:"",
            role:""
        },
        validationSchema: yup.object({
            name:yup.string().required("name is required!").min(3,"character should be more than 3"),
            dob:yup.date().required("date of birth is required"),
            role:yup.string().required("role is required!")
        }),
        onSubmit:(data)=>{
            console.log(data)
            localStorage.setItem('learnerData',JSON.stringify({fullName:data.name,dateOfBirth:data.dob,role:data.role}) )
            setTimeout(()=>{
                window.location.assign("https://github.com/login/oauth/authorize/?client_id="+process.env.REACT_APP_GITHUB_CLIENT_ID+"&allow_signup=true")
            
            },1000) 

        }
    })

return(
    <form className="font-notoSans mt-5" onSubmit={formik.handleSubmit}>
    <label className="block font-semibold">Enter your Name:</label>
    <input type="text" placeholder="Enter your name" name='name' onChange={formik.handleChange} value={formik.values.name} className="block border border-gray-300   p-2 rounded-lg  mt-2 outline-none w-full ps-4"/>
    {formik.errors.name ? <p className='text-red-700'>{formik.errors.name}</p>:null}
    <label className="block mt-3 font-semibold">Date of Birth:</label>
    <input type="date" name="dob" onChange={formik.handleChange} value={formik.values.dob} className="block border border-gray-300 p-2 rounded-lg  mt-2 outline-none w-full ps-4"/>
    {formik.errors.dob ? <p className='text-red-700'>{formik.errors.dob}</p>:null}
    <label className="block mt-3 font-semibold">your role:</label>
    <select name='role' onChange={formik.handleChange} value={formik.values.role} className="block border border-gray-300   p-2 rounded-lg  mt-2 outline-none w-full ps-4">
    <option value="">choose your role</option>
        <option value="student">Student</option>
        <option value="developer">Developer</option>
        <option className="teacher">Teacher</option>
        <option className="others">Others</option>
    </select>
    {formik.errors.role ? <p className='text-red-700'>{formik.errors.role}</p>:null}

<button className="bg-black mt-4 md:mt-3 md:w-6/12 w-full rounded-lg p-2 text-white"><img src={github} className='h-[20px] w-[20px] inline me-3' alt='github'/>Create Account via Github</button>

</form>
)
}
export default UserForm