import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

function Home() {
    const navigate = useNavigate();
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [userData,setUserData]=useState({})
    const baseUrl = "http://localhost:5000";

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Ensure withCredentials is true to send the session cookie
                const res = await axios.get(baseUrl + "/home", {withCredentials: true});
                console.log(res.data); // Log the response for debugging
                setUserAuthenticated(true);
                fetchData()
            } catch (err) {
                console.error(err);
                setUserAuthenticated(false);
                navigate("/signin"); // Navigate to signin if not authenticated
            }
           
        };
         const fetchData= async () => {
            try{
                //get the user profile from the backend
                const userProfile = await axios.get(baseUrl + "/profile", {withCredentials: true}); 
                setUserData(userProfile.data)
                console.log(userProfile.data)
                console.log(userData)
            }
            catch(err){
                console.error(err)
            }
         }

        checkAuth();
    }, [navigate]);

    return (
    <div>
             
                <Navbar 
                name={userData.username}
                id={userData.id} 

                />
              
                <div className="container" >
                  
                 <div className="homeDescription">
                  
                   <h4 >Explore the Latest News!</h4>
                  
                    <hr  />
                 
                    <p > <strong>Headlines Button:</strong> Click this to see the top trending news stories related to the subject you're interested in. These are the most popular and talked-about headlines right now!</p>

                    <p > <strong>Everything Button:</strong> If you want to dive deeper, click here to get all available news articles on that subject. This includes everything from recent reports to older stories, giving you a comprehensive view of what's happening.</p>

                    <p >Happy reading!</p> 
                   
                   <hr />
                  
                  </div> 
                    
                  <div className="homeButton">
                      
                       <a className="btn btn-outline-info btn-lg " href="/headlines" role="button">Headlines</a>
                       <a className="btn btn-outline-info btn-lg " href="/everything" role="button">Everything</a>
                  
                  </div>
                  
                </div>

                <Footer />
                     
     </div>
            );
}

export default Home;