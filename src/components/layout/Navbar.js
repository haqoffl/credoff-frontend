import { BookOpen, HandCoins, LogOutIcon, Menu, User, X, Youtube } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Search from "../ui/Search";
export default function Navbar(){
    let [dropdown,setDropDown] = useState(false)
    let [menuVis,setMenuVis] = useState(false)
    return(
<>
<div className="sticky z-50 bg-white top-0 ">
<div className={`${menuVis?"block":"flex justify-between "}lg:justify-around font-poppins py-3 shadow-md`}>
    <div className="w-3/12 text-center text-primary p-2">
    <h1 className="ms-3 font-semibold text-xl">Credoff</h1>
    </div>
    <div onClick={()=>{setMenuVis(!menuVis)}} className={`py-2 lg:hidden mr-5 cursor-pointer ${menuVis?"hidden":"block"}`}>
        <Menu />
    </div>
  <Search classes={"w-4/12 hidden lg:block"}/>
    <div className={`lg:w-5/12 lg:block ${menuVis?"transition block  translate-y-3 ease-linear":"hidden transition ease-linear"}`}>
        <ul className={`text-center lg:flex lg:justify-around w-full text-primary lg:p-2 nav-items`}>
            <li className="my-5 lg:my-0 font"><Youtube className="inline mr-3 lg:hidden"/>Tube</li>
            <li className="my-5 lg:my-0 opacity-55"><HandCoins className="inline mr-3 lg:hidden"/>Revenue</li>
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
         <p className="text-xl">M.Abdul Haq</p>
         <p className="text-gray-500">Github username : haqoffl</p>
         </div>
           <ul className="nav-drop">
            <li>My Account</li>
            <li className="opacity-55">Business Details</li>
            <li className="text-red-600 logout"><LogOutIcon className="inline mr-2 "/>Logout</li>
           </ul>
        </div>
                </div>
               
</div>
<Outlet />
</>
    )
}