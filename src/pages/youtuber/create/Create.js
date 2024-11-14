import {FileUploader} from "react-drag-drop-files"
import frame from '../../../assets/svg/Frame.svg'
import { useState } from "react"
import Tag from "../../../components/ui/Tags"
import { CircleMinus, CirclePlus } from "lucide-react"
import imagesize from 'browser-image-size'
import axios from 'axios'
import Spinner from "../../../components/ui/Spinner"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Create(){
let [tube,setTube] = useState({
    title:"",
    desc:"",
    thumbnail:null,
    tags:[],
    programming_language:""
}) 
let [thumbnail,setThumbnail] = useState()
let [thumbErr,setThumErr] = useState(null)

let [preview,setPreview] = useState(null)
let [errors,setErrors] = useState({
    title:"",
    desc:"",
    programming_language:"",
})
let [terms,setTerms] = useState([{filePath:"",keywords:[]}])
let [conditions,setConditions] = useState([{filePath:"",commentStart:"",commentEnd:"",function:""}])

let [errTerms,setErrorTerms] = useState([{filePathErr:""}])
let [errCondtions,setErrorConditions] = useState([{filePathErr:"",commStartErr:"",commEndErr:"",funcError:""}])
let [loading,setLoading] = useState(false)
let nav = useNavigate()
let myTube = (event)=>{
event.preventDefault()
let tubeObj = {
    ...tube,
    terms: [...terms],
    conditions: [...conditions],
    thumbnail:thumbnail,
    id:localStorage.getItem('youtuberId')
}

let tagsLength = tubeObj.tags.length < 6 ?true:false
let isErrorInTerm = terms.findIndex((val,i)=>{
    console.log(val)
    return errTerms[i].filePathErr !== null || val.keywords.length < 6
})
let isErrorInCond = conditions.findIndex((val,i)=>{
    return (errCondtions[i].commEndErr !== null || errCondtions[i].commStartErr !== null || errCondtions[i].filePathErr !== null || errCondtions[i].funcError !== null)
})

console.log("errors: ",tagsLength,isErrorInTerm,isErrorInCond)
if(tubeObj.title.length < 10 || tubeObj.desc.length < 200 || tubeObj.programming_language.length < 3 || tagsLength || isErrorInTerm !== -1 || isErrorInCond !== -1 || !tubeObj.thumbnail){
toast.info("Please make sure all fields are filled in.")
console.log(tubeObj)
}else{
    
    const formdata = new FormData()
    formdata.append('image',tubeObj.thumbnail)
    formdata.append('data',JSON.stringify(tubeObj))
    console.log(formdata)
    setLoading(true)

    axios.post(process.env.REACT_APP_BACKEND_URL+"tube/createTube",formdata,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    }).then((res)=>{
        setLoading(false)
        toast.success("created")
        nav('/youtuber/dashboard')
        console.log(res)
    }).catch(err=>{
        setLoading(false)
        toast.error("something went wrong")
        console.log(err)
    })
}
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

setErrorTerms((prev=>{
    return [...prev,{filePathErr:"",keywordsError:""}]
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

  let new_err_arr = errTerms.filter((val,index)=>{
    if(index !== 0)
        return index !== (errTerms.length-1)
    else
        return val
  })
  setErrorTerms(new_err_arr)
}

let addConditions = ()=>{
setConditions((prev)=>{
    return [...prev,{filePath:"",commentStart:"",commentEnd:"",function:""}]
})

setErrorConditions((prev)=>{
    return [...prev,{filePathErr:"",commStartErr:"",commEndErr:"",funcError:""}]
})
}
let removeConditions = ()=>{
    let new_arr = conditions.filter((val,index)=>{
        if(index !== 0)
            return index !== (conditions.length-1)
        else 
            return val
      })
      console.log(new_arr)
      setConditions(new_arr)
      let new_err_arr = errCondtions.filter((val,index)=>{
        if(index !== 0)
            return index !== (errCondtions.length-1)
        else return val
      })
      
      setErrorConditions(new_err_arr)
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

    setErrorTerms((prev)=>{
        return prev.map((val,i)=>{
            return index === i ? {...val,filePathErr:null}:{...val}
        })
       })
}
else{
    setErrorTerms((prev)=>{
        return prev.map((val,i)=>{
            return index === i ? {...val,filePathErr:"give the correct path"}:{...val}
        })
       })
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


let updateConditionFilePath = (index,path)=>{
    let is_path = isPath(path)
    if(is_path){
        console.log("it is file")
        setConditions((prev)=>{
            return prev.map((val,i)=>{
               return  index === i ? {...val,filePath:path}:{...val}
            })
        })

        setErrorConditions((prev)=>{
            return prev.map((val,i)=>{
                return index === i ? {...val,filePathErr:null}:{...val}
            })
           })
    }
    else{
        setErrorConditions((prev)=>{
            return prev.map((val,i)=>{
                return index === i ? {...val,filePathErr:"give the correct path"}:{...val}
            })
           })
    }
}
let updateCondtionCommentStart = (index,input)=>{
    if(input.length > 3){
        setConditions((prev)=>{
            return prev.map((val,i)=>{
                return index === i ? {...val,commentStart:input}:{...val}
            })
        })

        setErrorConditions((prev)=>{
            return prev.map((val,i)=>{
                return index === i ? {...val,commStartErr:null}:{...val}
            })
           })
    }else{
        setErrorConditions((prev)=>{
            return prev.map((val,i)=>{
                return index === i ? {...val,commStartErr:"This field must contain more than three characters."}:{...val}
            })
           })
    }



}

let updateCondtionCommentEnd = (index,input)=>{
    if(input.length > 3){
        setConditions((prev)=>{
            return prev.map((val,i)=>{
                return index === i ? {...val,commentEnd:input}:{...val}
            })
        })

        setErrorConditions((prev)=>{
            return prev.map((val,i)=>{
                return index === i ? {...val,commEndErr:null}:{...val}
            })
           })
    
    }else{
        setErrorConditions((prev)=>{
            return prev.map((val,i)=>{
                return index === i ? {...val,commEndErr:"This field must contain more than three characters."}:{...val}
            })
           })
    }


}


let updateCondtionFunction = (index,input)=>{
    if(input.length > 50){
        setConditions((prev)=>{
            return prev.map((val,i)=>{
                return index === i ? {...val,function:input}:{...val}
            })
        })

        setErrorConditions((prev)=>{
            return prev.map((val,i)=>{
                return index === i ? {...val,funcError:null}:{...val}
            })
           })
    
    }else{
        setErrorConditions((prev)=>{
            return prev.map((val,i)=>{
                return index === i ? {...val,funcError:"This field must contain more than 50 characters."}:{...val}
            })
           })
    }


}
let removeTags = (value,_)=>{
let t = tube.tags
let new_Arr = t.filter((val)=>{
    return val !== value
})
setTube((prev)=>{
    return {...prev,tags:new_Arr}
})
}

let removeKeywords = (value,index)=>{
    setTerms((prev)=>{
        return prev.map((val,i)=>{
            let new_keywords = val.keywords.filter((val)=>{return (val !== value)})
           return  index === i ? {...val,keywords:new_keywords}:{...val}
        })
    })

}

let handleFiles = async(file)=>{
console.log(file)
let {width,height} = await imagesize(file)
console.log(width,height)
if (width === 1280 && height === 720){
    setThumbnail(file)
    setThumErr(null)
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl)

}else{
    setThumErr("The image resolution should match the specified dimensions")
}

}
    return(
        <>
          {loading?<div className="mt-5 fixed text-center w-full">
                    <Spinner sizeClass={"size-40"}/>
                </div>:null}
        <div className="container mx-auto">
              
        <div className={`flex lg:justify-center ${loading?"opacity-30":"opacity-100"}`}>
        <form className="p-5 mt-5 w-full font-notoSans create-form lg:w-10/12">
                <label className="block mt-5 font-semibold text-xl">Tube Title</label>
                <input type="text" required={true} placeholder="enter tube title" className="create-input" onChange={(e)=>{updateBasicTube({title:e.target.value},10,100,"characters should be more than 10")}}/>
                <p className="text-red-600">{errors.title?errors.title:null}</p>
                <label className="block mt-5 font-semibold text-xl">Description</label>
                <textarea placeholder="Tell Learners about your course upto 200 to 5000 characters..." onChange={(e)=>{updateBasicTube({desc:e.target.value},100,5000,"characters should be more 200")}}>

                </textarea>
                <p className="text-red-600">{errors.desc?errors.desc:null}</p>

                <label className="block mt-5 font-semibold text-xl">Thumbnail</label>
               {!thumbnail?(
                 <FileUploader handleChange={handleFiles} name="file" types={["JPG", "PNG", "GIF"]} children={
                    <div className="flex flex-col justify-between border h-[300px] rounded-lg p-5 lg:w-8/12 mt-5" >
            
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
                                <li>Recommended size 1280 X 720</li>
                               </ul>
                            </div>
                    </div>
                    }/>
               ):<img src={preview} alt="thumbnail" className="w-full rounded-lg lg:w-8/12 "/>}
                {!thumbErr?null:<p className="text-red-600">{thumbErr}</p>}
                <label className="block mt-5 font-semibold text-xl">Tags</label>
               <div className="w-full lg:w-8/12 ">
               <Tag  updateTags={updateTagsInTube}  ind={-1} removeFunc={removeTags}/>

            <p className="text-red-600">{(tube.tags.length < 6 && tube.tags.length >0) ? <span>Tag should be at least more than 5</span>:null}</p>

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
                    {errTerms[i].filePathErr !=="" ? <p className="text-red-600">{errTerms[i].filePathErr}</p>:null}
                    <p className="text-gray-500 mt-1">Provide the full path of the file in the GitHub repository. (e.g.,/folder/filename.ext or /filename.ext)</p>
                        
                    <div className="w-full lg:w-8/12 ">
                   <Tag  updateTags={updateKeywordsInTerms} ind={i} removeFunc={removeKeywords} />

                   <p className="text-red-600">{(terms[i].keywords.length< 6 && terms[i].keywords.length > 0)? <span>Tag should be at least more than 5</span>:null}</p>

                </div>
                   <p className="text-gray-500 mt-1 mb-5"> Enter keywords, separated by commas (e.g.,for,switch,import library;)</p>

                   <hr className="w-full border-black lg:w-8/12"/>

                   </div>

                   
            )
          }))}


<div className="flex justify-between w-full lg:w-8/12">
                <label className="block mt-5 font-semibold text-xl">Conditions</label>
                <div className="flex gap-3 mt-5"><CirclePlus className="cursor-pointer" onClick={addConditions}/> <CircleMinus className="cursor-pointer" onClick={removeConditions}/></div>
                    </div>
{conditions.map((val,i)=>{
    return(
        <div className="mb-20">

<input type="text" placeholder="Enter the GitHub file path (e.g., /folder/filename.ext or /filename.ext)" className="create-input" onChange={(e)=>{updateConditionFilePath(i,e.target.value)}}/>
{errCondtions[i].filePathErr ? <p className="text-red-600">{errCondtions[i].filePathErr}</p>:null}

                <p className="text-gray-500 mt-1">Provide the full path of the file in the GitHub repository. (e.g.,/folder/filename.ext or /filename.ext)</p>

                <input type="text" placeholder="Enter the start comment identifier" className="create-input" onChange={(e)=>{updateCondtionCommentStart(i,e.target.value)}}/>

                {errCondtions[i].commStartErr ? <p className="text-red-600">{errCondtions[i].commStartErr}</p>:null}
                <p className="text-gray-500 mt-1">Provide the comment where the code block starts (e.g., // Start Code or # Start code).</p>

         <input type="text" placeholder="Enter the end comment identifier" className="create-input" onChange={(e)=>{updateCondtionCommentEnd(i,e.target.value)}}/>
         <p className="text-gray-500 mt-1">Provide the comment where the code block ends (e.g., // End Code or # End code).</p>
         {errCondtions[i].commEndErr ? <p className="text-red-600">{errCondtions[i].commEndErr}</p>:null}
                <textarea placeholder="Describe what the code does between Comment Start and Comment End" onChange={(e)=>{updateCondtionFunction(i,e.target.value)}}>

</textarea>
{errCondtions[i].funcError? <p className="text-red-600">{errCondtions[i].funcError}</p>:null}
<hr className="w-full border-black lg:w-8/12 mb-5 mt-5"/>

</div>
    )
})}
<label className="block mt-5 font-semibold text-xl">Programming Language</label>
<input type="text" placeholder="enter programming language" className="create-input" onChange={(e)=>{updateBasicTube({programming_language:e.target.value},3,100,"characters should be more 3")}}/>

<p className="text-red-600">{errors.programming_language?errors.programming_language:null}</p>

<p className="text-gray-500 mt-1">Provide the what programming language you covered in this tube eg: java,nodejs.</p>
  
<div className="mt-5 flex justify-center lg:justify-end w-full lg:w-8/12 mb-10">
<button disabled={loading} className="bg-primary block p-2 text-white w-11/12 lg:w-6/12 rounded-lg" onClick={(e)=>{myTube(e)}}>Create Tube</button>
</div>


            </form>
        </div>

        </div>

        <ToastContainer />
        </>
    )
}