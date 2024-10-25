import {FileUploader} from "react-drag-drop-files"
import frame from '../../../assets/svg/Frame.svg'
import { useState } from "react"
import Tag from "../../../components/ui/Tags"
import { CircleMinus, CirclePlus } from "lucide-react"

export default function Create(){
let [tube,setTube] = useState({
    title:"",
    desc:"",
    thumbnail:null,
    tags:[],
    programingLanguage:""
}) 

let [errors,setErrors] = useState({
    title:"",
    desc:"",
    programingLanguage:"",
    tag:""
})
let [terms,setTerms] = useState([{filePath:"",keywords:[]}])
let [tagsErrors,setTagErrors] = useState({index:null,message:""})

let myTube = (event)=>{
event.preventDefault()
console.log({
    tube,
    terms
})
}

let updateBasicTube= (val,min,max,errMsg)=>{
let keys = Object.keys(val)
let err = (val[keys[0]].length< min)? errMsg:"";
console.log(err)

setErrors((prevVal)=>{
    return {...prevVal,[keys[0]]:err}
})
setTube((prevVal)=>{
    return {...prevVal,...val}
})
}
let addTerms = ()=>{
setTerms((prev=>{
    return [...prev,{filePath:"",keywords:[]}]
}))
}

let removeTerms = ()=>{
  let new_arr = terms.filter((val,index)=>{
    if(index !== 0)
        return index !== (terms.length-1)
    else 
        return val
  })

  setTerms(new_arr)
}

function isPath(input) {
    // Trim whitespace from the input
    const trimmedInput = input.trim();
    // Check for presence of forward slashes or backward slashes
    const hasSlashes = trimmedInput.includes('/') || trimmedInput.includes('\\');
    // Check for a file extension (common extensions)
    const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(trimmedInput);
    // Determine if it's a path based on presence of slashes or file extension
    return hasSlashes && hasFileExtension;
}

let updateTermsFilePath =(index,path)=>{
let is_path = isPath(path)
if(is_path){
    console.log("it is file")
    setTerms((prev)=>{
        return prev.map((val,i)=>{
           return  index === i ? {...val,filePath:path}:{...val}
        })
    })
}
else{
    console.log("it is not path")
}
}

let updateKeywordsInTerms = (index,arr)=>{
    setTerms((prev)=>{
        return prev.map((val,i)=>{
           return  index === i ? {...val,keywords:[...val.keywords,arr[0]]}:{...val}
        })
    })
}

let updateTagsInTube = (_,tags)=>{
    setTube((prev)=>{
        return {...prev,tags:[...prev.tags,tags[0]]}
    })
}

let setTagError = (index,message)=>{
setTagErrors((prev)=>{
    return {...prev,index,message}
})
}

console.log(errors)
console.log(tube)
    return(
        <>
        <div className="container mx-auto">

        <div className="flex lg:justify-center">
        <form className="p-5 mt-5 w-full font-notoSans create-form lg:w-10/12">
                <label className="block mt-5 font-semibold text-xl">Tube Title</label>
                <input type="text" required={true} placeholder="enter tube title" className="create-input" onChange={(e)=>{updateBasicTube({title:e.target.value},10,100,"characters should be more than 10")}}/>
                <p className="text-red-600">{errors.title?errors.title:null}</p>
                <label className="block mt-5 font-semibold text-xl">Description</label>
                <textarea placeholder="Tell Learners about your course upto 200 to 5000 characters..." onChange={(e)=>{updateBasicTube({desc:e.target.value},100,5000,"characters should be more 200")}}>

                </textarea>
                <p className="text-red-600">{errors.desc?errors.desc:null}</p>

                <label className="block mt-5 font-semibold text-xl">Thumbnail</label>
                <FileUploader children={
                    <div className="flex flex-col justify-between border h-[300px] rounded-lg p-5 lg:w-8/12 mt-5">
            
                        <div className="flex  justify-center">
                        <div className="text-center mt-10">
                            <div className="flex justify-center"> 
                            <img src={frame} alt="upload" className="block text-center"/>
                            </div>
                            <p>Drag and drop an image ,or <span className="text-primary">Browse</span></p>
                            <p className="text-gray-500">Max 6MB each (125MB for videos) </p>
                            </div>

                       
                        </div>

                        <div>
                               <ul className="ms-2 lg:ms-0 list-disc lg:flex lg:justify-between text-gray-500">
                                <li>Aspect ratio 16:9</li>
                                <li>Recommended size 1024 X 576</li>
                               </ul>
                            </div>
                    </div>
                    }/>

                <label className="block mt-5 font-semibold text-xl">Tags</label>
               <div className="w-full lg:w-8/12 ">
               <Tag  updateTags={updateTagsInTube} setErr={setTagError} ind={-1}/>

            <p className="text-red-600">{tagsErrors.index === -1 ? tagsErrors.message:null}</p>

               <p className="text-gray-500 mt-1"> Enter Tags, separated by commas for create Ai generated quiz</p>
               </div>
               <div className="flex justify-between w-full lg:w-8/12">
                <label className="block mt-5 font-semibold text-xl">Terms</label>
                <div className="flex gap-3 mt-5"><CirclePlus className="cursor-pointer" onClick={addTerms}/> <CircleMinus className="cursor-pointer" onClick={removeTerms}/></div>
                    </div>
          {terms.map(((val,i)=>{
            return(
                <div className="mb-20">
            
                    <input type="text" placeholder="Enter the GitHub file path (e.g., /folder/filename.ext or /filename.ext)" className="create-input" onChange={(e)=>{updateTermsFilePath(i,e.target.value)}}/>
                    <p className="text-gray-500 mt-1">Provide the full path of the file in the GitHub repository. (e.g.,/folder/filename.ext or /filename.ext)</p>
                        
                    <div className="w-full lg:w-8/12 ">
                   <Tag  updateTags={updateKeywordsInTerms} setErr={setTagError} ind={i}/>

                   <p className="text-red-600">{tagsErrors.index === i ? tagsErrors.message:null}</p>

                </div>
                   <p className="text-gray-500 mt-1 mb-5"> Enter keywords, separated by commas (e.g.,for,switch,import library;)</p>

                   <hr className="w-full border-black lg:w-8/12"/>

                   </div>

                   
            )
          }))}


                <label className="block mt-5 font font-semibold text-xl">Conditions</label>

                <input type="text" placeholder="Enter the GitHub file path (e.g., /folder/filename.ext or /filename.ext)" className="create-input"/>
                <p className="text-gray-500 mt-1">Provide the full path of the file in the GitHub repository. (e.g.,/folder/filename.ext or /filename.ext)</p>

                <input type="text" placeholder="Enter the start comment identifier" className="create-input"/>
                <p className="text-gray-500 mt-1">Provide the comment where the code block starts (e.g., // Start Code or # Start code).</p>

         <input type="text" placeholder="Enter the end comment identifier" className="create-input"/>
         <p className="text-gray-500 mt-1">Provide the comment where the code block ends (e.g., // End Code or # End code).</p>

                <textarea placeholder="Describe what the code does between Comment Start and Comment End">

</textarea>
<label className="block mt-5 font-semibold text-xl">Programming Language</label>
<input type="text" placeholder="enter programming language" className="create-input" onChange={(e)=>{updateBasicTube({programingLanguage:e.target.value},3,100,"characters should be more 3")}}/>

<p className="text-red-600">{errors.programingLanguage?errors.programingLanguage:null}</p>

<p className="text-gray-500 mt-1">Provide the what programming language you covered in this tube eg: java,nodejs.</p>
  
<div className="mt-5 flex justify-center lg:justify-end w-full lg:w-8/12 mb-10">
<button className="bg-primary block p-2 text-white w-11/12 lg:w-6/12 rounded-lg" onClick={(e)=>{myTube(e)}}>Create Tube</button>
</div>


            </form>
        </div>

        </div>
        </>
    )
}