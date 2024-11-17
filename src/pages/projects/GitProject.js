import { useEffect,useState } from "react"
import axios from 'axios'
import {ArrowRight, FolderGit2} from 'lucide-react'
import GitCard from "../../components/ui/GitCard"
import { useNavigate } from "react-router-dom"

function GitProject(){
    let [repo,setRepo]=useState([])
    let [selectedRepo,setSelectedRepo]=useState(null)
    let nav = useNavigate()
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'users/githubRepos/'+localStorage.getItem('github_access_token')).then(res=>{
            console.log(res.data)
            setRepo(res.data)
        }
        ).catch(err=>console.log(err))
    },[])

    let nextToAIReview=()=>{
        if(selectedRepo){
            let rep = selectedRepo
            let obj = {
                name:rep.name,
                fullName:rep.full_name,
                url:rep.html_url,
                description:rep.description,
                language:rep.language,
                stars:rep.stargazers_count,
                forks:rep.forks_count,
                visibility:rep.visibility,
                pushed_at:rep.pushed_at,
                         
             }
             sessionStorage.setItem('gitProject',JSON.stringify(obj))
             let tube = JSON.parse(sessionStorage.getItem('youtuberTube'))
             nav('/aiEval/'+tube._id)
        }else{
            alert("select a project")
        }
    }
    return(
        <>
        <div className="container mx-auto font-poppins">
      <h1 className="text-primary text-2xl font-semibold mt-5 ms-5">Credoff</h1>
      <div className="mt-10 mb-24">
        <div className="flex items-center flex-col">
        <p className="text-dark text-xl font-notoSans font-semibold w-full lg:w-8/12 ms-5 lg:ms-5">Github repositories<FolderGit2 className="inline ms-2"/></p>

         {repo.length>0?repo.map((val,index)=>{
            return(
                <GitCard key={index} repo={val} setState={setSelectedRepo} state={selectedRepo}/>
            )
        }):<p className="text-gray-600 text-lg mt-10 font-notoSans font-semibold w-full lg:w-8/12">No repositories found,make sure your repository is public</p>}
        </div>
      </div>
          {repo.length>0?  <div className="border p-5 fixed -bottom-1 left-2 right-2 bg-primary text-white rounded-t-lg font-notoSans">
          <div className="flex justify-between text-xs lg:text-base">
          <p className="">Choose a GitHub repository from your listed projects completed for this course to be evaluated by Credoff AI.</p>
            <span className="text-white w-2/12 " onClick={()=>{nextToAIReview()}}><span className="cursor-pointer ">Next <ArrowRight className="inline ms-2" /></span></span>
            </div>
          </div>:null}
        </div>
        </>
    )
}
export default GitProject