
import React from "react"
import Layout from "../pages/Layout"
import { BrowserRouter, Routes,Route,Switch } from "react-router-dom"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import Home from "../pages/Home"
import Failure from "../pages/Failure"
import Headlines from "../pages/Headlines"
import Coverpage from "../pages/Coverpage"
import Everything from "../pages/Everything"
import HeadlinesHistory from "../pages/HeadlinesHistory"
import EverythingHistory from "../pages/EverythingHistory"
import ReadMore from "../pages/ReadMore"

  function App(){
    return(
        <div className="container">
        
            
            <BrowserRouter>
                <Routes>
                    
                     <Route path="/" element={<Layout />}>
                        <Route index element={<Coverpage />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/home" element={<Home />} /> 
                        <Route path="/failed" element={<Failure />} /> 
                        <Route path="/headlines" element= {<Headlines />} />
                        <Route path="/everything" element={<Everything />} />
                        <Route path="/h-history" element={<HeadlinesHistory />} />
                        <Route path="/e-history" element={<EverythingHistory />} />
                        <Route path="/readmore" element={<ReadMore />} />
                       
                        
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
  }

  export default App