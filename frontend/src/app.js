import { Routes,Route, Link } from "react-router-dom";

// both
import {Home} from "./components/Home";
import Navbar from "./components/navbar";
import NotFound from "./components/NotFound";

// admin
import AdminLoginPage from "./components/login/AdminLogin";
import AdminWelcome from "./components/admin/AdminWelcome";
import ViewAllTrains from "./components/admin/ViewTrains";
import AllOrders from "./components/admin/AllOrders";

// user
import UserSignupPage from "./components/login/UserSignUp";
import UserLoginPage from "./components/login/UserLogin";
import UserWelcome from "./components/user/UserWelcome";
import UserProfile from "./components/user/MyProfile";
import SearchTrains from "./components/user/SearchTrains";
import Myorders from "./components/user/Myorders";

// redux
import { useSelector } from "react-redux";

function App(){
    const authtype = useSelector(state => state.login.authtype);
    return(
        <>
        <Navbar />
        <Routes>
            <Route path="/" element ={<Home />} />
            <Route path="/UserLogin" element ={<UserLoginPage />} />
            <Route path="/UserSignup" element ={<UserSignupPage />} />
            <Route path="/AdminLogin" element ={<AdminLoginPage />} />
            <Route path="/app" >
                {authtype==="user" && <>
                    <Route index element ={<UserWelcome/>} />
                    <Route path="myprofile" element ={<UserProfile />} />
                    <Route path="searchtrains" element ={<SearchTrains />} />
                    <Route path="myorders" element ={<Myorders />} />
                    <Route path="*" element ={<NotFound />} />
                </>}
                {authtype==="admin" && <>
                    <Route index element ={<AdminWelcome/>} />
                    <Route path="mytrains" element ={<ViewAllTrains />} />
                    <Route path="allorders" element ={<AllOrders />} />
                    <Route path="*" element ={<NotFound />} />
                </>}
                {authtype===null && <Route index element ={<NotFound />} /> }
            </Route>
            <Route path="*" element ={<NotFound />} />
        </Routes>
    </>
    )
}


export default App;

