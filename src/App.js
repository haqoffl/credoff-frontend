import {BrowserRouter, Route, Routes} from "react-router-dom"
import Signup from "./pages/signup/Signup"
import Dashboard from "./pages/youtuber/dashboard/Dashboard"
import Navbar from "./components/layout/Navbar"
import Create from "./pages/youtuber/create/Create"
import Tag from "./components/ui/Tags"
import Account from "./pages/account/Account"
import Login from "./pages/login/Login"
import Quiz from "./pages/quizzes/Quiz"
import GitProject from "./pages/projects/GitProject"
import Certificate from "./pages/certificate/Certificate"
import Eval from "./pages/evaluating/Eval"
import GetStart from "./pages/getStart/GetStart"
import Home from "./pages/Learner/Home"
import 'react-toastify/dist/ReactToastify.css';
import User from "./pages/user/User"
import Pay from "./pages/pay/Pay"

function App(){
  return(
    <>
<BrowserRouter>
<Routes>
<Route path="/" element={<Signup />}/>
<Route path="/login" element={<Login />}/>

<Route  element={<Navbar />} > 
 <Route path="youtuber/dashboard" element={<Dashboard />}/>
 <Route path="youtuber/create" element={<Create />}/>
 <Route path="/test" element={<Tag />}/>
  </Route>

<Route element={<Account />} path="/myAccount/:role"/>
<Route element={<Quiz />} path="/quizzes/:tube_id"/>
<Route element={<GitProject />} path="/gitProject" />
<Route element={<Certificate />} path="/certificate"/>
<Route element={<Eval />} path="/aiEval/:tube_id"/>
<Route element={<GetStart />} path="/creds/:tube_id" />
<Route element={<Home />} path="/learner"/>
<Route element={<User />} path={"/user/:learnerId/:tubeId/:type"}/>
<Route element={ <Pay />} path="/pay"/>
</Routes>
</BrowserRouter>    </>
  )
}


export default App