import { BookOpen, HandCoins, LogOutIcon, Menu, User, X, Youtube ,CircleUser, Home, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import Search from "../ui/Search";
function LearnerNavbar(){
    let [dropdown,setDropDown] = useState(false)
    let [menuVis,setMenuVis] = useState(false)
    let nav = useNavigate()

 
    return(
        <>
        <div className="sticky z-50 bg-white top-0 ">
<div className={`${menuVis?"block":"flex justify-between "}lg:justify-around font-poppins py-3 shadow-md`}>
    <div className="w-3/12 text-center text-primary p-2">
    <h1 className="ms-3 font-semibold text-xl">Credoff</h1>
    </div>
 
  
    <div className={`lg:w-9/12 hidden lg:block`}>
        <ul className={`text-center lg:flex justify-end gap-10 w-full text-primary lg:p-2 nav-items`}>
            <li className="my-5 lg:my-0 font"><Youtube className="inline mr-3 lg:hidden"/>Home</li>
            <li className="my-5 lg:my-0 opacity-55"><HandCoins className="inline mr-3 lg:hidden"/>Search</li>
            <li className="my-5 lg:my-0 opacity-55"><BookOpen className="inline mr-3 lg:hidden"/>Resourse</li>
            <li  onClick={()=>{setDropDown(!dropdown)}} className="my-5 lg:hidden"><User className="inline mr-3"/>My Account</li>
            <li   onClick={()=>{setMenuVis(!menuVis);setDropDown(false)} } className="my-5  text-red-500 lg:hidden"><X className="inline mr-3"/>close</li>


            <li className="hidden lg:block my-5 lg:my-0"onClick={()=>{setDropDown(!dropdown)}}>
                <span ><User /></span>
              
            
            </li>
        </ul>
    </div>
</div>

<div className={`border nav-drop-container absolute bg-white shadow right-0 md:w-3/12 w-12/12 ${dropdown?"block":"hidden"} `}>
        <div>
         <div className="p-5">
         <p className="text-xl">{localStorage.getItem('name')}</p>
         <p className="text-gray-500">Github username : {localStorage.getItem('github_username')}</p>
         </div>
           <ul className="nav-drop">
            <li onClick={()=>{nav('/myAccount/learner')}}>My Account</li>
            <li className="opacity-55">Business Details</li>
            <li className="text-red-600 logout"  onClick={()=>{localStorage.clear();nav('/login')}}><LogOutIcon className="inline mr-2 "/>Logout</li>
           </ul>
        </div>
 </div>
               
</div>

{/* buttom bar */}
<div className="lg:hidden fixed bottom-0  w-full bg-white z-50">
           <ul className="flex justify-around pb-2 shadow">
            <li className="text-primary border-t border-t-primary pt-2"><Home /></li>
            <li className="pt-2 text-gray-400"><Search /></li>
           <li className="pt-2 text-gray-400"> <BookOpen /></li>
           <li className="pt-2" onClick={()=>{nav('/myAccount/learner')}}><CircleUser /></li>
            <li className="pt-2 text-red-600" onClick={()=>{localStorage.clear();nav('/login')}}><LogOutIcon /></li>
           </ul>
       </div>
        </>
    )
}
export default LearnerNavbar