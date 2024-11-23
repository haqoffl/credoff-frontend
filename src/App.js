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
import LearnerRestrictor from './privateRouteRestrictors/LearnerRestrictor'
import YoutuberRestrictor from "./privateRouteRestrictors/YoutuberRestrictor"
import PaymentRestrictor from "./privateRouteRestrictors/PaymentRestrictor"
import Restrictor from "./privateRouteRestrictors/Restrictor"

function App(){
  return(
    <>
<BrowserRouter>
<Routes>
<Route path="/" element={<Restrictor><Signup /></Restrictor>}/>
<Route path="/login" element={<Restrictor><Login /></Restrictor>}/>

<Route  element={<Navbar />} > 
 <Route path="youtuber/dashboard" element={<YoutuberRestrictor><Dashboard /></YoutuberRestrictor>}/>
 <Route path="youtuber/create" element={<YoutuberRestrictor><Create /></YoutuberRestrictor>}/>
 <Route path="/test" element={<Tag />}/>
  </Route>

<Route element={<Account />} path="/myAccount/:role"/>
<Route element={<LearnerRestrictor><Quiz /></LearnerRestrictor>} path="/quizzes/:tube_id"/>
<Route element={<LearnerRestrictor><GitProject /></LearnerRestrictor>} path="/gitProject" />
<Route element={<Certificate />} path="/certificate/:tubeId/:learnerId"/>
<Route element={<LearnerRestrictor><Eval /></LearnerRestrictor>} path="/aiEval/:tube_id"/>
<Route element={<GetStart />} path="/creds/:tube_id" />
<Route element={<LearnerRestrictor><Home /></LearnerRestrictor>} path="/learner"/>
<Route element={<User />} path={"/user/:learnerId/:tubeId/:type"}/>
<Route element={ <PaymentRestrictor><Pay /></PaymentRestrictor>} path="/pay"/>
</Routes>
</BrowserRouter>    </>
  )
}


export default App