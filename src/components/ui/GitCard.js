import { useState } from "react"
import {ArrowUpFromLine, CheckCircle, CodeXml, Eye, FolderGit2, Star} from 'lucide-react'

export default function GitCard({repo,setState,state}){
    let [click,setClick] = useState(false)

    let selectRepo = ()=>{
        setClick(!click)
        setState(repo)
    } 
    return(
        <div className="p-3 w-full lg:w-8/12 mt-5 ">
        <div className={` ${click && (state===repo)?"border border-primary":"border"}  p-3 w-full lg:w-8/12  rounded-lg hover:cursor-pointer hover:shadow-lg shadow-slate-400`} onClick={()=>selectRepo()}>
<div className="flex justify-between">
<p className="text-gray-600 text-sm"><ArrowUpFromLine className="inline me-2"/> Pushed at {repo.pushed_at}</p>
{click && (state===repo)?<CheckCircle className="me-2 text-primary"/>:null}
</div>
        <div className="flex mt-7 gap-2">
            <img src={repo.owner.avatar_url} className="w-5 h-5 rounded-full block"/>
            <p className="text-sm font-semibold">{repo.full_name}</p>
        </div>
        <p className="text-sm font-notoSans mt-3 ms-2">{!repo.description?"no description":repo.description}</p>

        <div className="flex  text-gray-400 mt-5 gap-5">
            <span className="block text-[10px]"><CodeXml className="inline ms-2 me-2"/>{repo.language}</span>
            <span className="block"><Star className="inline me-2 "/>{repo.stargazers_count}</span>
            <span className="block"><FolderGit2 className="inline me-2 "/>{repo.forks_count}</span>
            <span><Eye className="inline me-2 "/>{repo.visibility}</span>
        </div>
        </div>
    </div>
    )
}