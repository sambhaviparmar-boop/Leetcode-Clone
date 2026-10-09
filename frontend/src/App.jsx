import {Routes, Route, Navigate} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {checkAuth} from "./authSlice";
import  {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";


const App = () => {

//check krna ek br autheticate h ya nh user
const {isAuthenticated} =  useSelector((state)=> state.auth);
const dispatch = useDispatch(); 


useEffect(()=>{
dispatch(checkAuth());
}, [dispatch]);



  return(
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Homepage/> : <Navigate to="/signup" />}></Route>
         <Route path="/login" element={isAuthenticated ? <Navigate to = "/" /> : <Login />}></Route>
          <Route path="/signup" element={isAuthenticated ? <Navigate to = "/" /> :<Signup />}></Route>
      </Routes>
    </>
  )
}

export default App
