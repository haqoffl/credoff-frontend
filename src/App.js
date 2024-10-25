import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./pages/login/Login"
import Dashboard from "./pages/youtuber/dashboard/Dashboard"
import Navbar from "./components/layout/Navbar"
import Create from "./pages/youtuber/create/Create"
import Tag from "./components/ui/Tags"
function App(){
  return(
    <>
<BrowserRouter>
<Routes>
<Route path="/" element={<Login />}/>

<Route  element={<Navbar />} > 
 
 <Route path="youtuber/dashboard" element={<Dashboard />}/>
 <Route path="youtuber/create" element={<Create />}/>
 <Route path="/test" element={<Tag />}/>
  </Route>

</Routes>
</BrowserRouter>    </>
  )
}


export default App