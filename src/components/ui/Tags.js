import { CircleX } from "lucide-react"
import { useState } from "react"

export default function Tag({updateTags,ind,removeFunc}){
    let [tags,setTags] = useState([])
    let commaToTag =(val)=>{
      console.log(val)
let isValidValue = val.trim()
console.log(isValidValue)
if(isValidValue !== ','){
  let arr = val.split(",")
  let isThere = tags.findIndex((val)=> val===arr[0])
 if(arr.length > 1&&isThere === -1){
   setTags(prev=>{
       return [...prev,arr[0]]
   })

   updateTags(ind,arr)

 }
}
    }
    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
        removeFunc(tagToRemove,ind)        
      };
    
    return(
        <>
    
        <div className="mt-5 border flex flex-wrap gap-3 p-3 py-10">
        {tags.map((val)=>{
            return <span  className="bg-primary p-1 lg:p-2 px-3 inline-block rounded-full text-white ">{val} <CircleX onClick={() => removeTag(val)} className="inline font-light cursor-pointer ms-2 size-4 lg:size-5 lg:mb-0 mb-1"/></span>
        })}
            <input type="text"  className="outline-none inline ms-4 min-w-max flex-1 tag-feild"  onChange={(e)=>{commaToTag(e.target.value);}}/>
        </div>
        </>
    )
}